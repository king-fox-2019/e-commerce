<template>
<div class="col-10 pl-0 pr-0 mt-5" style="overflow-y: scroll; background-color:#ECEDEF; ;height: 94.9vh;">
<h1 class="text-center mt-4">Sell Product</h1>
<hr>
    <div class="row justify-content-center">
        <div v-for="(img,i) in imgReview" :key="i">
            <div class="d-flex justify-content-center flex-row">
                <div :style="img" class="imgHover" data-toggle="modal" :data-target="'#exampleModalCenter'+i"></div>
                <div v-if="name" class="modal fade" :id="'exampleModalCenter'+i" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                  <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title text-center mx-auto" style="font-weight: bolder; font-size: 30px;" id="exampleModalLongTitle">{{ name }}</h5>
                        <!-- <button type="button" class="close"  aria-label="Close"> -->
                        <!-- </button> -->
                      </div>
                      <div class="modal-body">
                        <div :style="img +'width: 100%; height: 100vh;'" ></div>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-danger" @click="deleteimage(img,i)" data-dismiss="modal">Delete</button>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row ml-5 mt-2 justify-content-center">
        <div class="custom-file text-left" style="width: 250px;">
          <input @change="onFileChange" multiple="multiple" type="file" class="inputFile"  id="customFile">
          <label class="custom-file-label" for="customFile">{{ images.length == 0 ? 'Choose File' : images.length + ' images' }}</label>
        </div>
    </div>
    <div class="row justify-content-center">
        <div class="form-group">
          <small id="helpId" class="form-text text-muted text-center mt-3">Product Name</small>
          <input v-model="name" type="text" class="text-center form-control inputProduct" name="" id="" aria-describedby="helpId" placeholder="Product Name">
          <small id="helpId" class="form-text text-muted text-center mt-3">Product Options</small>
          <div class="d-flex justify-content-center text-center">
                <select v-model="size" id="inputState" class="form-control selectProduct">
                  <option selected>Choose Size</option>
                  <option>28</option>
                  <option>29</option>
                  <option>30</option>
                  <option>31</option>
                  <option>32</option>
                  <option>40</option>
                  <option>41</option>
                </select>
                <input v-model="stock" type="number" min="0" class="text-center form-control selectProductNumber ml-3" name="" id="" aria-describedby="helpId" placeholder="Stock">
                <div class="input-group ml-3">
                    <div class="input-group-prepend">
                      <div class="input-group-text">
                          Rp.
                      </div>
                    </div>
                    <input v-model="price" type="number" min="0" class="form-control selectProductPrice" name="" id="inlineFormInputGroup" aria-describedby="helpId" placeholder="Price">
                </div>
          </div>
            <button type="button" @click="createProduct" class="btn btn-primary btn-block mt-3">Create</button>
        </div>
    </div>
</div>
</template>

<script>
import axios from '../../apis/axios'
import Swal from 'sweetalert2'
export default {
  name: 'productSell',
  data () {
    return {
      name: '',
      size: 'Choose Size',
      price: '',
      stock: '',
      images: [],
      imgReview: []
    }
  },
  methods: {
    onFileChange (e) {
      var files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      this.createImage(files)
    },
    createImage (files) {
      this.images = []
      files.forEach(file => {
        this.images.push(file)
        let image = new Image()
        let reader = new FileReader()
        let vm = this
        vm.imgReview = []
        reader.onload = (e) => {
          vm.imgReview.push(`height: 300px; width: 300px; background: url(${e.target.result}) no-repeat center center/cover;`)
        }
        reader.readAsDataURL(file)
      })
    },
    deleteimage (img, i) {
      Swal.showLoading()
      let temporary = []
      let newImage = []
      this.imgReview.forEach(image => {
        if (image !== img) {
          temporary.push(image)
        }
      })
      this.images.forEach((image, index) => {
        console.log(i)
        if (index !== i) {
          newImage.push(image)
        }
      })
      this.imgReview = temporary
      this.images = newImage
      Swal.close()
    },
    createProduct () {
      if (this.size != 'Choose Size') {
        let form = new FormData()
        form.set('name', this.name)
        form.set('size', this.size)
        form.set('price', this.price)
        form.set('stock', this.stock)
        this.images.forEach(image => {
          form.append('image', image)
        })
        axios({
          url: '/product',
          method: 'POST',
          data: form,
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(({ data }) => {
          console.log(data)
          this.$router.push('/admin/listproduct')
        })
        .catch(error => {
          console.log(error)
          Swal.fire({
            title: 'Error!',
            text: error.response.data.errors.join(' | '),
            icon: 'error',
            // imageWidth: 400,
            // imageHeight: 200,
            timer: 2500,
            imageAlt: 'Custom image',
            showConfirmButton: false,
            showCancelButton: false,
            confirmButtonText: 'نعم',
            cancelButtonText: 'لا'
          })
        })
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'size is required!',
          icon: 'error',
          // imageWidth: 400,
          // imageHeight: 200,
          timer: 2500,
          imageAlt: 'Custom image',
          showConfirmButton: false,
          showCancelButton: false,
          confirmButtonText: 'نعم',
          cancelButtonText: 'لا'
        })
      }
    }
  }
}
</script>

<style scoped>
*{
    overflow-x: hidden;
    overflow-y: hidden;
}
.imgHover:hover{
    cursor: pointer;
    border: 4px solid rgba(68, 68, 68, 0.295);
}
.selectProductPrice{
    width: 1rem;
}
.selectProductPrice:focus{
    box-shadow: none;
}

.selectProductNumber{
    width: 12rem;
}
.selectProductNumber:focus{
    box-shadow: none;
}
.selectProduct{
    width: 9rem;
}
.selectProduct:focus{
    box-shadow: none;
}

.inputProduct{
    width: 30rem;
    font-weight: bolder;
}
.inputProduct:focus{
    box-shadow: none;
}
.logogif{
    background: url('../assets/adidasBubble.gif');
}

.buttonOptions{
    background-color: rgb(255, 255, 255);
    color: rgb(139, 139, 139);
}
.buttonOptions:hover{
    background-color: rgb(255, 255, 255);
    color: black;
}
.buttonOptions:focus{
    box-shadow: none;
}
</style>
