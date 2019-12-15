<template>
  <div class="about">
     <div v-if="getDetailTransaction === true" id="transaction-notif" class="card mb-3" style="max-height:200px;width:500px;position:absolute;right:20px;top:100px;box-shadow: 10px 10px 38px -8px rgba(0,0,0,0.41);">
        <div class="row no-gutters">
            <div>
            <img :src="getCart.productId.images[2]" style="width:200px;height:200px;"  alt="" srcset="">
            </div>
            <div class="col-md-6">
            <div class="card-body" style="width:300px;">
                <h5 class="card-title right">{{getCart.productId.name}}</h5>
                <div class='display-form'>
                    <div class="left">
                      {{this.ammount}}
                    <p class="card-text" style="font-size:12px;margin:0px">size : US {{getCart.number}}</p>
                    
                    <p class="card-text" style="font-size:12px;margin:0px">amount : {{this.amount}}</p>
                    
                    <p class="card-text" style="font-size:12px;margin:0px">price : Rp. {{getCart.productId.price}}</p>
                    
                    <p class="card-text"><strong>Total : Rp. {{this.amount * getCart.productId.price }} </strong> </p>
                    </div>
                </div>
            </div>
            </div>
        </div>
    </div>
    
    <!-- <div class="about"> -->
    <div class="hero-picture" id='product-hero'>
      <img v-if="heroImages === true" :src= getProduct.images[0] id='product-hero-1' style="height:550px;width:550px;min-width:100px;">
      <img v-if="image1 === true" :src= getProduct.images[1] id='product-large-1' style="height:550px;width:550px;">
      <img v-if="image2 === true" :src= getProduct.images[2] id='product-large-1' style="height:550px;width:550px;">
      <img v-if="image3 === true" :src= getProduct.images[3] id='product-large-1' style="height:550px;width:550px;">
      <div class="small-picture">
        <img @mouseover="imagesOne" @mouseout="imagesHero" :src= getProduct.images[1] id='product-small-1' alt="" srcset="">
        <img @mouseover="imagesTwo" @mouseout="imagesHero" :src= getProduct.images[2] id='product-small-2' alt="" srcset="">
        <img @mouseover="imagesThree" @mouseout="imagesHero" :src= getProduct.images[3] id='product-small-3' alt="" srcset="">
      </div> 
    </div>
      <div class="details">
        <div class="content-detail">
          <h1 style="font-size:32px;">{{getProduct.name.split('-')[0]}}</h1>
          <h1 style="font-size:72px;margin-top:-15px;">{{getProduct.name.split('-')[1]}}</h1>
        </div>
          <p>
            {{getProduct.description}}
          </p>
          <hr>
          <form >
          <div class="buy-form" >
            <div class="form-group">
              <label for="exampleFormControlSelect1">select size (US) </label>
              <select v-model="size" class="form-control" id="exampleFormControlSelect1">
                <option :disabled="stock.stock == 0" v-for="stock in getProduct.stock" :key="stock._id">{{stock.number}}</option>
              </select>
            </div>
            <div class="form-group" style="width:150px;margin-left:30px">
            <label for="exampleFormControlSelect1">insert amount</label>
            <input v-model="amount" class="form-control" type="text">
            </div>
            </div>
            <b-button pill variant="primary" size="sm" type='submit' @click="addToCart(getProduct._id)"><i class="fas fa-cart-plus" ></i> Add </b-button>
            <router-link to="/">
              <b-button pill variant="dark" size="sm" style="margin-left:10px"> back </b-button>
            </router-link>
          </form>
      </div>

      
  </div>
</template>

<script>
  import Swal from 'sweetalert2'
  export default {
      name:'detail-product',
      data(){
        return {
          size: 0,
          amount: 0,
          heroImages : true,
          image1 : false,
          image2 : false,
          image3 : false,
          detailTransaction: false,
          productDetail : []
        }
      },
      methods: {
        imagesOne(){
          this.heroImages = false
          this.image1 = true
        },
        imagesTwo(){
          this.heroImages = false
          this.image2 = true
        },
        imagesThree(){
          this.heroImages = false
          this.image3 = true
        },
        imagesHero(){
           this.heroImages = true
           this.image1 = false
           this.image2 = false
           this.image3 = false
        },
        async addToCart(id){
          
          if(localStorage.getItem('token')){
            
            if(this.amount === 0 || this.size === 0){
              alert('please insert data')
            }else{
              await this.$store.dispatch('addToCart',{
                id,
                size : this.size,
                amount : this.amount
              })
              this.detailTransaction = true
            setTimeout(() => {
              this.detailTransaction = false
              this.amount = ''
              this.size = ''
            },8000)
          }
           
          }else{
            alert('login first')
          }
        }
      },
      computed :{
        getProduct(){
          return this.$store.state.detailProduct[0]
        },
        getCart(){
          return this.$store.state.cartNow
        },
        getDetailTransaction(){
          return this.$store.state.detailTransaction
        }
      },
      created(){
        this.$store.dispatch('productDetail',this.$route.params.id)
      }
}
</script>

<style scoped>

button{
  transition: all .2s ease-in-out;
  height:40px;
  width:100px;
  margin-top:20px;
}
button:hover{
    transform: scale(1.1)
}
.content-detail{
  margin-top:200px;
}

.buy-form{
  width:500px;
  display:flex;
}

hr.style-six {
    border: 0;
    height: 0;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
}

h1{
  font-family:'Bebas Neue';
  color:rgb(29, 29, 29)
}

p{
  color:rgb(46, 46, 46);
  font-size:14px;
}

  .about{
    display:flex;
    flex-direction:row;
    margin-top:-10%;
    height:calc(100vh + 25vh);
    width:100%;
    background: linear-gradient(172deg, rgb(240, 240, 240) 50%, rgba(255,255,255,1) 50%);
  }

  .small-picture img{
    margin:15px;
    width:160px;
    height:160px;
    min-width:160px;
    min-height:160px;
    
  }


  #product-hero{
    width:60%;
    margin-top:15%;
    margin-left:10%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-width:300px;
  }
  .details{
    display:flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    width:50%;
    margin-left:5%;
    margin-right:10%;
  }

</style>