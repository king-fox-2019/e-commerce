<template>
  <div class="transaction">
      <div class="container-inside-left">
      <h1>Detail Transaction</h1>
      <br>
        <form @submit.prevent="createTransaction">
                <div class="form-group">
                <label for="inputEmail4">First Name</label>
                <input v-model="firstName" type="text" class="form-control" required >
                </div>

                <div class="form-group">
                <label for="inputPassword4">Last Name</label>
                <input v-model="lastName"  type="text" class="form-control" required >
                </div>

                <div class="form-group">
                    <label for="exampleFormControlTextarea1">Address</label>
                    <textarea v-model="street" class="form-control"  rows="2" required></textarea>
                </div>
            
                 <div class="form-group">
                    <label for="exampleFormControlSelect1">Province</label>
                    <select v-on:change="getCity()" v-model="province" class="form-control" id="exampleFormControlSelect1">
                    <option v-for="(province,i) in getCities" :key="i" >{{province.province}}</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="exampleFormControlSelect1">City</label>
                    <select v-on:change="getCost()" v-model="city" class="form-control" id="exampleFormControlSelect1">
                    <option v-for="(city,i) in getCitiesInProvince" :key="i" >{{city.city_name}}</option>
                    </select>
                </div>

                <div class="form-group">
                <label for="inputZip">Zip</label>
                <input v-model="postalCode" type="number" class="form-control" placeholder="12345" required>
                </div>
        
            <button type="submit" class="btn btn-primary">checkout</button>
            </form>
      </div>

      <div class="container-inside-right" style="overflow:scroll">
        <h1 style="margin-bottom:60px;">Summary</h1>
        
            <div class="detailItem" >
            <p style="font-size:18px" class="card-text"><strong>Total Items :</strong>  </p>
            <p style="font-size:18px" class="card-text">{{getTotalItems}}</p>
            </div>
         <hr style="width:100%;margin:5px">
             <div class="detailItem" >
            <p style="font-size:18px" class="card-text"><strong>Delivery fee : </strong> </p>
            <p style="font-size:18px" class="card-text">Rp. {{getDeliveryCost.toLocaleString()}}</p>
            </div>
        <hr style="width:100%;margin:5px">
             <div class="detailItem" >
            <p style="font-size:18px" class="card-text"><strong>Total Price : </strong> </p>
            <p style="font-size:18px" class="card-text">Rp. {{getTotalPayment.toLocaleString()}}</p>
            </div>

        <hr style="width:100%;margin:5px;">
        <div class="list-items" >
        <br>
<!-- ------------------------------------------------------------------------------------------------------------------------ -->
        <div class="overflow" >
            
        
            <div v-for="(cart, index) in getCart" :key="index" class="card mb-3">
                <div class="row no-gutters">
                    <div>
                    <img :src= cart.Stock_id.productId.images[1] id='product-small' alt="" srcset="">
                    </div>
                    <div class="col-md-6">
                    <div class="card-body">
                        <h5 class="card-title right">{{cart.Stock_id.productId.name}}</h5>
                        <div class='display-form'>
                            <div class="left">
                            <p class="card-text">size : US {{cart.Stock_id.number}}</p>
                            <hr style="width:100%;margin:5px">
                            <p class="card-text">amount : {{cart.count}}</p>
                            <hr style="width:100%;margin:5px">
                            <p class="card-text">price : Rp. {{cart.Stock_id.productId.price.toLocaleString()}}</p>
                            <hr style="width:100%;margin:5px">
                            <p class="card-text"><strong>Total : Rp. {{cart.total_payment.toLocaleString()}} </strong> </p>
                            <button type="submit" style="margin-top:20px;" @click="removeTransaction(cart._id)" class="btn btn-primary btn-sm">remove</button>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>

        </div>
<!-- ------------------------------------------------------------------------------------------------------------------------ -->
        </div>
      </div>
  </div>
</template>

<script>
export default {
    name:'transaction-page',
    data(){
        return {
            firstName : '',
            lastName : '',
            street : '',
            city: '',
            province: '',
            postalCode: '',
            totalItems : ''
        }
    },

    methods: {
        getCost(){
            this.$store.dispatch('calculateCost',this.city)
        },
        getCity(){
            this.$store.dispatch('getCityDetail',this.province)
        },
        getValue(){
            let payload = {
                city : this.city,
                delivery : this.delivery
            }
            console.log(payload)
        },
        createTransaction(){
            let payload = {
                firstName: this.firstName ,
                lastName: this.lastName,
                street: this.street,
                city: this.city,
                province: this.province,
                postalCode: this.postalCode
            }
            this.$store.dispatch('createTransaction',payload)
        },
        removeTransaction(id){
            // console.log(id)
            this.$store.dispatch('removeTransaction',id)
        }
    },

    computed : {
        getCitiesInProvince(){
            return this.$store.state.allCitiesInProvince
        },
        getCities(){
            return this.$store.state.allCities
        },
        getCart(){
            return this.$store.state.detailCart
        },
        getTotalItems(){
            let allItems = 0
            for(let i = 0 ; i < this.$store.state.detailCart.length; i++){
                allItems += this.$store.state.detailCart[i].count
            } 
            return allItems
        },
        getTotalPayment(){
            let totalPayment = this.$store.state.deliveryCost
            for(let i = 0 ; i < this.$store.state.detailCart.length; i++){
                totalPayment += this.$store.state.detailCart[i].total_payment
            }
            return totalPayment
        },
         getDeliveryCost(){
          return this.$store.state.deliveryCost
        }
    },
    created(){
        this.$store.dispatch('getCart')
        this.$store.dispatch('getCity')
    },

}
</script>

<style scoped>

.detailItem{
    display:flex;
    justify-content:space-between
}
.transaction{
    padding-top:3%;
    height:calc(100vh);
    width:100%;
    display:flex;
    justify-content: center;
}
.container-inside-left{
    width:30%;
    padding:5%;
}
.container-inside-right{
    width:50%;
    padding:5%;
}

.card{
    max-height:300px;
    min-width:300px;
}

.row{
    display: flex;
    align-items: center;
}

#product-small{
    width:auto;
    height:250px;
}

h1{
  font-family:'Bebas Neue';
  color:rgb(29, 29, 29)
}

h5{
    font-family:'Bebas Neue';
  color:rgb(29, 29, 29)
}

p{
    margin:0px; 
    font-size:14px;
}

</style>