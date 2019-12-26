<template>
        <!-- <h4>filename: components/CartProduct.vue</h4> -->
        <div class="card mb-3 shadow-sm p-3 mb-5 bg-white rounded" style="width: 100%;">
            <div class="row no-gutters">
                <div class="col-md-4" >
                <img :src="cart.ProductId.imageUrl" class="card-img" alt="" style="margin-top:30%" >
                </div>
                <div class="col-md-8">
                <div class="card-body" >
                    <h5 class="card-title" style="text-align: center; font-weight:bold">{{ cart.ProductId.name }}</h5>
                    <ul class="list-group list-group-flush product-detail" >
                        <li class="list-group-item">Rp {{ cart.ProductId.price }}</li> 
                        <li class="list-group-item"><input type="number" class="form-control" min=0 style="width:40%;margin:auto" :value="cart.quantity"></li>
                        <li class="list-group-item"><a href="#" class="card-link"  @click.prevent="addToCart">Edit Item</a></li>
                        <li class="list-group-item" style="color:red">Rp {{ cart.ProductId.price * cart.quantity }}</li>
                    </ul>
                </div>
                </div>
            </div>
        </div>

</template>




<script>
export default {

    props:[
        'cart'
    ],
    data: function(){
        return{

        }
    }





}
</script>




<style>
.product-detail
{
    /* text-align: right; */
    float:right
}




</style>