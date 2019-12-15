<template>
    <div>
        <div class="container d-flex flex-wrap justify-center">
            <v-img id="shop-card" src="../assets/img/black_template.png" v-for="data in listProduct" :key="data._id" class="mx-6 my-10" max-height="200px" :contain="true" max-width="150px">
                <v-hover v-slot:default="{ hover }">
                    <v-expand-transition>
                        <div class="container mt-8 d-flex flex-column align-center" style="height: 100%;">
                            <img src="../assets/img/dota2.png" alt="" width="100%">
                            <img :src="data.image" alt="" class="mt-3">
                            <p style="color: white;" class="product-name">{{data.name}}</p>
                        <div
                            v-if="hover"
                            class="d-flex flex-column transition-fast-in-fast-out white darken-2 v-card--reveal black--text"
                            style="height: 70%;"
                            >
                            <div style="font-size: 18px; color: black" class="d-flex flex-column">
                                <span style="color: orange"><i class="fas fa-coins">  {{data.price}}</i></span>
                                <span style="color: red"><i class="fas fa-archive">  {{data.stock}}</i></span>
                            </div>
                            <div class="d-flex" style="font-size: 24px; color: blue;">
                                <v-tooltip bottom color="warning">
                                    <template v-slot:activator="{ on }">
                                        <span class="mr-4 user-once"><i class="fas fa-star" v-on="on"></i></span>
                                    </template>
                                    <span>Add to whishlist</span>
                                </v-tooltip>
                                <v-tooltip bottom color="success">
                                    <template v-slot:activator="{ on }">
                                         <span class="user-once" @click.prevent="addToCart(data._id, data.price, data.name)"><i class="fas fa-cart-plus" v-on="on"></i></span>
                                    </template>
                                    <span>Add to cart</span>
                                </v-tooltip>
                            </div>
                        </div>
                        </div>
                    </v-expand-transition>
                </v-hover>
            </v-img>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      count: 10,
      height: '200px'
    }
  },
  methods: {
    addToCart (id, price, name) {
      let payload = {
        id,
        price
      }
      this.$store.dispatch('cart/addCart', payload)
        .then(({ data }) => {
          this.$store.dispatch('cart/fetchCart')
          this.$toast.success(`Add ${name} to cart!`, 'OK', {
            position: 'topCenter'
          })
        })
        .catch(err => {
          this.$toast.error(`${err.response.data.message}`, 'Error', {
            position: 'topRight'
          })
        })
    }
  },
  created () {
    this.$store.dispatch('product/fetchProduct')
  },
  computed: {
    listProduct () {
      return this.$store.state.product.listProduct
    }
  },
  beforeRouteEnter: (to, from, next) => {
    let valid = localStorage.getItem('token')
    if (valid) {
      next()
    } else {
      next('/user-control/login')
    }
  }
}
</script>

<style scoped>

@import url('https://fonts.googleapis.com/css?family=Cuprum&display=swap');

#shop-card{
    box-shadow: 1px 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: 0.3s;
    transform-style: preserve-3d;
}
#shop-card:hover{
    box-shadow: 4px 8px 16px 10px rgba(255, 255, 255, 0.2);
    transform-style: preserve-3d;
    animation: none;
    z-index: 50;
    height: calc(1.4 * 250px);
    position: relative;
    top: calc((-1 * (1.4 * 150px) / 2) + ((1.4 * 120px) / 2));
    /* left: calc((-1 * 150px / 2) + (100px / 2)); */
}
.v-card--reveal {
  align-items: center;
  justify-content: center;
  bottom: 0;
  opacity: .9;
  position: absolute;
  width: 100%;
}

.user-once{
    cursor: pointer;
}

.product-name{
  font-family: 'Cuprum', sans-serif;
  margin-top: 15px;
  font-size: 18px;
}
</style>
