<template>
  <div class="item">
      <div class="list-item">
          <h1>Add Item</h1>
            <br>
            <form style="width:50%" @submit.prevent="addProduct">
                <div class="form-group">
                    <label for="exampleFormControlInput1">Product Name</label>
                    <input v-model="name" type="text" class="form-control" id="exampleFormControlInput1" placeholder="format : Air Jordan 1 high - Obsidian UNC">
                </div>
                <div class="form-group">
                    <label for="exampleFormControlTextarea1">Description</label>
                    <textarea v-model="description" class="form-control" id="exampleFormControlTextarea1" rows="2">max 200 char</textarea>
                </div>
                <div class="form-group">
                    <label for="exampleFormControlInput1">Price</label>
                    <input  v-model="price" type="text" class="form-control" id="exampleFormControlInput1" placeholder="number">
                </div>

                <div class="imageSetion" style="display:flex;justify-content:center">
                    
                    <div class="form-group">
                        <img src="https://storage.googleapis.com/nike-public-bucket/1576040659250-p0-air-jordan-1-obsidian.png" style="width:150px;height:150px" alt="">
                        <b-form-file v-model="file1" class="mt-3" plain></b-form-file>
                        <div class="mt-3">Selected file: {{ file1 ? file1.name : '' }}</div>
                    </div>
                     <div class="form-group">
                         <img src="https://storage.googleapis.com/nike-public-bucket/1576040659253-p1-air-jordan-2-obsidian-700.jpg" style="width:150px;height:150px" alt="">
                        <b-form-file v-model="file2" class="mt-3" plain></b-form-file>
                        <div class="mt-3">Selected file: {{ file2 ? file2.name : '' }}</div>
                    </div>
                     <div class="form-group">
                        <img src="https://storage.googleapis.com/nike-public-bucket/1576040659256-p2-air-jordan-2-obsidian-700.jpg" style="width:150px;height:150px" alt="">
                        <b-form-file v-model="file3" class="mt-3" plain></b-form-file>
                        <div class="mt-3">Selected file: {{ file3 ? file3.name : '' }}</div>
                    </div>
                    <div class="form-group">
                        <img src="https://storage.googleapis.com/nike-public-bucket/1576040659259-p3-air-jordan-2-obsidian-700.jpg" style="width:150px;height:150px" alt="">
                        <b-form-file v-model="file4" class="mt-3" plain></b-form-file>
                        <div class="mt-3">Selected file: {{ file4 ? file4.name : '' }}</div>
                    </div>

                    
                </div>
                   <center> <b-button pill variant="primary" style="width:100px;margin-top:50px" type='submit'> Add Item</b-button></center>
            </form>
      </div>
  </div>
</template>

<script>
export default {
    name:'addItem-page',
    data(){
        return {
            name:'',
            description:'',
            price:'',
            file1:null,
            file2:null,
            file3:null,
            file4:null
        }
    },

    methods: {
      addProduct(){
        let formData = new FormData()
        formData.append ('name',this.name)
        formData.append ('description',this.description)
        formData.append ('price',this.price)
        formData.append ('images',this.file1)
        formData.append ('images',this.file2)
        formData.append ('images',this.file3)
        formData.append ('images',this.file4)
        console.log(formData)
        this.$store.dispatch('addProduct',formData)
      }
    },

    created(){
    },

}
</script>

<style scoped>
h1{
     font-size:36px;
    font-family:'Bebas Neue';
}

th{
    font-size: 12px;
    font-weight: 200;
}
.item{
    display: flex;
    justify-content: center;
    align-content: center;

}
.list-item{
    width:80vw;
    height:100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    overflow: scroll;
}

.imageSetion .form-group{
    margin:30px;
}

</style>