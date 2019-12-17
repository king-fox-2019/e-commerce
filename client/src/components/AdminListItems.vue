<template>
  <div class="item">
          <h1 style="font-size:36px">List Item</h1>
      <div class="list-item">
           <div id="items" v-for="(product, i) in products" :key="i" class="card mb-3">
                <div class="row no-gutters">
                    <div class="col-md-12" style="display:flex;align-items:center">
                    <div>
                    <img :src="product.images[1]" style="width:300px;height:300px;" alt="" srcset="">
                    </div>
                    <div class="col-md-2"  style="min-width:300px;margin-left:20px;">
                        <h1 class="card-title right">{{product.name.split('-')[0]}}</h1>
                        <h2 class="card-title right">{{product.name.split('-')[1]}}</h2>
                        <div class='display-form'>
                            <div class="left">
                            <p class="card-text" >ID : {{product._id}}</p>
                            <p class="card-text" >Price : Rp. {{product.price.toLocaleString()}}</p>
                            <br>
                            <br>
                            <b-button pill variant="success" data-toggle="modal" data-target="#exampleModal"  style="width:100px;margin-right:10px" @click="index = i"> Edit</b-button>
                            <b-button pill variant="danger" style="width:100px;" @click="removeItem(product._id)" > Remove</b-button>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-2" style="display:flex;flex-wrap:wrap;padding:20px;">
                       <form @submit.prevent="addStock(product._id)">
                        <div class="form-group">
                            <label for="exampleFormControlSelect1">Size in US</label>
                            <select v-model="number" class="form-control" id="exampleFormControlSelect1">
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                            <option>7</option>
                            <option>8</option>
                            <option>6</option>
                            <option>7</option>
                            <option>8</option>
                            <option>9</option>
                            <option>10</option>
                            <option>11</option>
                            <option>12</option>
                            <option>13</option>
                            <option>14</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Stock</label>
                            <input v-model="stock" type="number" class="form-control" id="exampleInputPassword1" placeholder="stock" required>
                        </div>
                        <b-button pill variant="primary" style="width:120px;" type='submit'> Add Size</b-button>
                    </form>
                    </div>
                    <div class="col-md-3" style="display:flex;flex-wrap:wrap;padding:20px;">
                        <button v-for="(size,index) in product.stock" :key="index" style="margin:4px;font-size:12px" type="button" class="btn btn-outline-secondary">US {{size.number}} | {{size.stock}} pcs</button>
                    </div>
                    
                    </div>
                </div>
            </div>

      </div>
                    
                      <div class="modal fade" id="exampleModal" :hide-footer=true :hide-header=true>
                        <div class="modal-dialog" role="document">
                        <div class="modal-content" style="border-radius:20px">
                            <div class="modal-body">
                        <form style="padding:3rem" @submit.prevent="editProduct(products[index]._id)">
                            <div class="form-group">
                              <label for="exampleInputEmail1" style="font-family:'Bebas Neue';font-size:26px">Name</label>
                              <input v-model="name" type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Product Name - Sub Name">                        
                            </div>
                           
                            <div class="form-group">
                              <label  for="exampleInputPassword1" style="font-family:'Bebas Neue';font-size:26px;">Description</label>
                              <input v-model="description" type="text" class="form-control" id="exampleInputPassword1" placeholder="Description">
                            </div>

                            <div class="form-group">
                              <label for="exampleInputPassword1" style="font-family:'Bebas Neue';font-size:26px;">Price</label>
                              <input v-model="price" type="number" class="form-control" id="exampleInputPassword1" placeholder="Price">
                            </div>
                            <b-button  pill variant="primary" size="sm" style="width:80px;margin-right:10px" type="submit" > Edit </b-button>
                            <b-button  pill variant="dark" size="sm"  data-dismiss="modal" style="width:80px"> Close </b-button>
                        </form>
                      </div>
                    </div>
                    </div>
                </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
    name:'addItem-page',
    data(){
        return {
            number:0,
            stock:0,
            index:0,
            name:'',
            description:'',
            price:''
        }
    },
    computed:mapState(['products']),
    // watch:{
    //     products(){
    //         return this.$store.state('products')
    //     }
    // },
    methods: {
        editProduct(productId){
            let payload = {
                productId : productId,
                name : this.name,
                description: this.description,
                price : this.price
            }
            this.$store.dispatch('editProduct',payload)
            $('#exampleModal').modal('hide');
        },
        removeItem(productId){
            this.$store.dispatch('removeItem',productId)
        },
        addStock(productId){
            let payload = {
                number : this.number,
                stock : this.stock,
                productId : productId
            }
            this.$store.dispatch('addStock',payload)
        }
    },

    created(){
        this.$store.dispatch('fetchProduct')
    },

}
</script>

<style scoped>
h1{
    font-size:18px;
    font-family:'Bebas Neue';
    margin-bottom:0px;
}

h2{
    font-size:28px;
    font-family:'Bebas Neue';
}

p{
    font-size:16px;
    margin: 0px;
}


th{
    font-size: 12px;
    font-weight: 200;
}

#items{
    margin:20px;
    width:70vw;
}
.item{
    margin-top:50px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

}
.list-item{
    width:100vw;
    height:100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    overflow: scroll;
    margin:50px;
}

.imageSetion .form-group{
    margin:30px;
}

</style>