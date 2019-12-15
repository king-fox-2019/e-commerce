<template>
    <div style="border: 2px solid red">
        <h1> filename: components/ProductEdit.vue</h1>

    <div style="display:flex;justify-content:center">
        <b-card no-body class="overflow-hidden" style="width: 75vw;height:80vh">
        <b-row no-gutters>
            <b-col md="6">
            <div style="margin-top:5%">
                <img src="./../assets/headset (1).jpg" alt="" style="height:100%; width:auto; max-height:80vh;">
            </div>
            </b-col>
            <b-col md="6" style="display:flex;justify-content:center;align-items:center;padding:50px">
            <b-card-body>
                <form>
                    <div class="form-group">
                        <input type="text" class="form-control" id="editName" style="font-size: 50px">
                        <label for="editName" class="label-form">Name</label>
                    </div>
                    <div class="form-group">
                        <textarea type="text" class="form-control" id="editDescription" rows=5  style="resize: none;"></textarea>
                        <label for="editDescription" class="label-form">Description</label>
                    </div>
                    <div class="form-group">
                        <input type="number" class="form-control " min=0 id="editPrice">
                        <label for="editPrice" class="label-form">Price</label>
                    </div>
                    <div class="form-group">
                        <input type="number" class="form-control" min=0 id="editQuantity">
                        <label for="editQuantity" class="label-form">Quantity</label>
                    </div>
                    <button type="submit" class="btn btn-primary" style="margin:10px" @click.prevent="">Edit My Product</button>
                    <button type="submit" class="btn btn-primary" style="margin:10px" @click.prevent="">Back</button>
                </form>
            </b-card-body>
            </b-col>
        </b-row>
        </b-card>
    </div>
    
    </div>
</template>





<script>
export default {
    name: "productEdit"





}
</script>






<style>

.form-control
{
    border:none;
    border-bottom: solid 1px gray;
    outline: none;
    text-align: center
    /* font-size: 100px */
    
}


.label-form
{
    font-weight: 700
}

textarea:focus, input:focus{
    outline: none;
}


input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}




</style>