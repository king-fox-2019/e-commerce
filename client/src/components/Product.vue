<template>

<div class="container">
    <!-- <h1>{{filteredProduct}}</h1> -->
     <div v-for="(product, i) in filteredProduct"  :key="i" class="product-page" style="width:20rem; margin:70px;">


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
                    <a class="card-link" href="" data-toggle="modal" data-target="#exampleModalLong"  @click="index = i">more</a>
                
            </b-card-text>
            </b-card-body>
                <hr>

            <b-card-body id="card-body-bottom">
            <b-card-sub-title id="card-body-price" class="mb-4">Rp. {{product.price.toLocaleString()}}</b-card-sub-title>
            <b-button @click.prevent="testPush(product._id)" pill variant="primary" size="sm" style="width:100px"><i class="fas fa-cart-plus" style="margin-right:5px"></i> Buy </b-button>
            </b-card-body>
        </b-card>


    </div>

    
        <div class="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content" style="border-radius:20px">
               
                <div class="modal-body">
                    <img :src="filteredProduct[index].images[1]" style="height:350px;width:auto;margin-top:50px">
                    <b-card-title id="title-detail" >{{filteredProduct[index].name.split('-')[0]}}</b-card-title>
                    <b-card-sub-title class="mb-4" id="sub-title">{{filteredProduct[index].name.split('-')[1]}}</b-card-sub-title>
                    <hr>

                    <p>
                    {{filteredProduct[index].description}}
                    </p>
                </div>
                <div class="modal-footer">
    
                    <b-button  pill variant="dark" size="sm"  data-dismiss="modal" style="width:80px"> Close </b-button>
                    <b-button @click.prevent="testPush(filteredProduct[index]._id)" pill variant="primary" data-dismiss="modal" size="sm" style="width:100px"><i class="fas fa-cart-plus" style="margin-right:5px"></i> Buy </b-button>
                </div>
                </div>
            </div>
        </div>




</div>
   

</template>



<script>
import { mapState } from 'vuex'
export default {
    name:'home',
    computed : mapState(['products', 'userRole','filteredProduct']),
    data(){
        return {
            index : 0
        }
    },
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



.modal-body p{
    padding-left:50px;
    padding-right:50px;
    text-align:center
}

.modal-body{
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center
}

.modal-body hr{
    border: 0.5px solid rgb(98, 98, 98);
    width:50px;
    margin-top:20px;
    margin-bottom:40px;
}

#product-card{

    min-height: 700px;
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

#title-detail{
    margin-top:50px;
    font-size:22px;
    font-family:'Bebas Neue';
    color:#2b2b2b;
}


#sub-title{
    font-size:40px;
    font-family:'Bebas Neue';
    color:#2b2b2b;
    line-height: 95%;
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