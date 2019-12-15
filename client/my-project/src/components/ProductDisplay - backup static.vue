<template>
        <div class="col mb-4" >
            <h5> filename: components/ProductDisplay.vue </h5>
            <b-card> 
                <div  style="overflow: hidden;">
                <img src="/image/headset (1).jpg" alt="image" style="width:auto; height:210px; ">
                </div>
                <b-container style="margin-top:20px">
                <b-card-title> Title</b-card-title>
                </b-container>
                <b-card-text>
                    This is a wider card with supporting text below as a natural lead-in to additional content.
                    This content is a little bit longer.
                </b-card-text>
                <b-list-group flush>
                    <b-list-group-item style="color:red; font-weight:bold">Rp 1.000.000</b-list-group-item>
                    <b-list-group-item>1 in stock</b-list-group-item>
                </b-list-group>
                <b-container fluid style="margin-top:11px">
                        <b-form-input type="number" min=0 style="width:100px; margin:auto; text-align:center"></b-form-input><!-- muncul kalau login sebagai buyer-->
                </b-container>
                <div class="card-body" style="padding:10px">
                <a href="#" class="card-link">Edit Detail</a> <!-- muncul kalau login sebagai seller-->
                <a href="#" class="card-link">Add to Cart</a> <!-- muncul kalau login sebagai buyer-->
                </div>
                <div class="card-footer">
                    <small class="text-muted">jap</small>
                </div>
            </b-card>
        </div>
</template>

<script>
export default {
    name: 'ProductDisplay'
}
</script>

<style>

</style>