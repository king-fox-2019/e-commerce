<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-3">
        <h1 class="my-4"></h1>
        <div class="list-group">
          <img src="https://tpc.googlesyndication.com/simgad/11750628565187597027" border="0" width="200" height="250" alt="" class="img_ad">
          <img alt="" class="i-amphtml-fill-content i-amphtml-replaced-content" decoding="async" src="https://tpc.googlesyndication.com/simgad/8306199918342185931">
        </div>
      </div>
      <div class="col-lg-9">
        <div>
          <b-carousel
            id="carousel-fade"
            style="text-shadow: 0px 0px 2px #000"
            fade
            indicators
            img-width="1024"
            img-height="480"
            class="mb-3 mt-3"            
          >
            <b-carousel-slide
              img-src="https://cdn.shopify.com/s/files/1/0718/5347/files/33_Off_Holiday_Banner_-_Collection_1920x592_crop_center.progressive.jpg?v=1576188821"
            ></b-carousel-slide>
            <b-carousel-slide
              img-src="https://cdn.shopify.com/s/files/1/0718/5347/files/7252550C-1C29-4ED7-82DE-A3D4B802171D_1920x592_crop_center.progressive.jpeg.jpg?v=1574974408"
            ></b-carousel-slide>
            <b-carousel-slide
              img-src="https://cdn.shopify.com/s/files/1/0718/5347/files/Solid_gold_Banner_-_Desktop_1920x592_crop_center.progressive.jpg?v=1574877348"
            ></b-carousel-slide>
          </b-carousel>
        </div>

        <div class="row">
          <div class="col-lg-4 col-md-6 mb-4" v-for="item in allItem" :key="item.id">
            <div class="card h-100">
              <a href="#"><img class="card-img-top" :src="item.image" alt=""></a>
              <div class="card-body">
                <h6 class="card-title">
                  <a href="#">{{item.name}}</a>
                </h6>
                <hr>
                <h5>$ {{item.price}}</h5>
                <p>stock: {{item.stock}}</p>
                 <b-button-toolbar aria-label="Toolbar with button groups and input groups">
                  <b-button-group size="sm" class="mr-1">
                    <b-button>add cart</b-button>
                  </b-button-group>
                  <div class="number-input md-number-input">
                    <input class="quantity" min="0" :max="stok(item.stock)" name="quantity" value="1" type="number" style="width:50px">
                  </div>
                </b-button-toolbar>
                
              </div>
              <div class="card-footer">
                <small class="text-muted">&#9733; &#9733; &#9733; &#9733; &#9734;</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'

export default {
  name: 'home',
   data() {
      return {
        form: 0,
        foods: [{ text: 'Select One', value: null }, 'Carrots'],
      }
    },
  components: {
    
  },
  computed:{
    ...mapGetters({
      allItem: 'product/getProducts'
    })
  },
  methods:{
    ...mapActions({
      fetchAction: 'product/fetchAction'
    }),
    stok(num){
      return num
    },
  },
  created(){
    this.fetchAction()
  }
}
</script>

<style scoped>

</style>
