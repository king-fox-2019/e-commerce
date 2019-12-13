<template>

<div class="container">
    
     <div v-for="(product, index) in products"  :key="index" class="product-page" style="width:20rem; margin:70px;">
         <b-card
            id="product-card"
            no-body
            style="width:20rem;max-heigth: 300px; border-radius: 1.25rem;border:none;"
            img-alt="Image"
            img-top
        >
        <b-card-img :src="product.images[0]" id="card-image" class="rounded-0"></b-card-img>
            <b-card-body style="padding-left:30px;padding-right:30px">
            <b-card-title id="title" >{{product.name.split('-')[0]}}</b-card-title>
            <b-card-sub-title class="mb-4" id="sub-title">{{product.name.split('-')[1]}}</b-card-sub-title>
            <b-card-text>
                {{product.description.slice(0,80)}}...
                
                    <!-- <a class="card-link" href="" @click.prevent="$route.push(`/detail`)">more</a> -->
                    <a class="card-link" href="" @click.prevent="testPush(product._id)">more</a>
                
            </b-card-text>
            </b-card-body>
                <hr>

            <b-card-body id="card-body-bottom">
            <b-card-sub-title id="card-body-price" class="mb-4">idr.{{product.price}}</b-card-sub-title>
            <b-button @click.prevent="testPush(product._id)" pill variant="primary" size="sm" style="width:100px"><i class="fas fa-cart-plus" style="margin-right:5px"></i> Buy </b-button>
            <b-button v-if="userRole" pill variant="primary" size="sm" style="margin-left:10px"> delete </b-button>
            </b-card-body>
        </b-card>
    
    </div>



</div>
   

</template>



<script>
import { mapState } from 'vuex'
export default {
    name:'home',
    computed : mapState(['products', 'userRole']),
  
    methods: {
        
        testPush(id){
          
            this.$store.dispatch('productDetail',id)
            this.$router.push(`/detail/${id}`)
        },
        
    },
    created() {
        if(localStorage.getItem('role')==='admin'){
            this.$store.commit('CHANGE_ROLE',true)
        }else{
            this.$store.commit('CHANGE_ROLE',false)
        }
        this.$store.dispatch('fetchProduct')
    },
    
}
</script>

<style scoped>

#product-card{
    box-shadow: 15px 10px 70px -13px rgba(0,0,0,0.15);
    transition: all .2s ease-in-out;
}
#product-card:hover{
    
    box-shadow: 35px 30px 75px -2px rgba(0,0,0,0.2);
    transform: scale(1.02);
}

.container{
    padding:100px;
    max-width: 1600px;
    display:flex;
    flex-wrap: wrap;
}

#card-image{
    top:-80px;
    height:370px;
    width:auto;
    position:absolute;
    transition: all .2s ease-in-out;
}

#card-image:hover{
    transform: scale(1.1);
}


button{
    transition: all .2s ease-in-out;
}
button:hover{
    transform: scale(1.1)
}

#title{
    margin-top:270px;
    font-size:22px;
    font-family:'Bebas Neue';
    color:#2b2b2b;
}

#sub-title{
    font-size:42px;
    font-family:'Bebas Neue';
    color:#2b2b2b;
}

#card-body-bottom{
    padding-left:50px;
    padding-right:50px;
    margin-bottom:20px
}

#card-body-price{
    font-size:24px;
    font-family:'Bebas Neue';
}

.card-img-top {
    width: 120%;
    border-top-left-radius: calc(0.25rem - 1px);
    border-top-right-radius: calc(0.25rem - 1px);
}



</style>