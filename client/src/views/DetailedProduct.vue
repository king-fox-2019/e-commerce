<template>
  <div>
    <!-- <div v-if="productDetailed && productDetailed.name">{{productDetailed}}</div>
    <div v-else>loading...</div>-->
    <!-- add to cart button tambahin ntr validasi ada/gak stock nya kl gak gbs di click -->
    <!-- kasi toast added to your cart, biar user bs browse belanjaan lain lg -->

    <div class="pageProduct">
       <div class="productImage">
        <figure class="image">
          <img :src="productDetailed.imageSource" weight="1000" height="1000" />
        </figure>
      </div>
      <div class="productInfo">
        <h1
          style="font-family: Playfair Display; serif; font-size: 50px; letter-spacing: 8px; font-weight: 900;"
        >{{productDetailed.name}}</h1>
        <br>
        <div class="detil">
        <p class="infoText" style="font-family: 'Josefin Sans', sans-serif;">{{productDetailed.description}}</p>
        <p class="stock" style="font-family: 'Josefin Sans', sans-serif;">stock : {{productDetailed.stock}}</p>
        <p class="price" style="font-family: 'Josefin Sans', sans-serif; letter-spacing: 1px;">{{formatPrice}}</p>
        <br>
 <!-- increment -->
        <div v-if="!isAdmin" class="numberContainer">
          <b-field>
            <b-numberinput
              min="1"
              :max="productDetailed.stock"
              type="is-dark"
              size="is-small"
              v-model="number"
              controls-position="compact"
              controls-rounded
            ></b-numberinput>
          </b-field>
        </div>
        <!-- increment  -->
        <br>
        <button class="button is-black" v-if="!isAdmin" @click="addedToCart">add to cart</button>
        </div>
        <br>
      <!-- isAdmin  -->
      <div v-if="isAdmin">
      <div>
        <button
          class="button is-black"
          @click="$router.push(`/products/update/${productDetailed._id}`)"
        >update</button>
      </div>
      <br>
      <div>
        <button class="button is-black" @click="confirmDelete">delete</button>
      </div>
    </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { toast } from 'bulma-toast'

export default {
  name: 'detailedProduct',
  data () {
    return {
      productDetailed: {
        price: 0
      },
      number: 1
    }
  },
  methods: {
    fetchDetailedProduct () {
      const id = this.$route.params.id
      this.axios(`/products/${id}`)
        .then(({ data }) => {
          // console.log(data)
          this.productDetailed = data
        })
        .catch(err => {
          console.log(err)
        })
    },
    addedToCart () {
      console.log(this.$route)
      if (!localStorage.getItem('token')) {
        this.$buefy.toast.open({
          type: 'is-red',
          message: 'You have to login'
        })
      } else {
        this.axios
          .post(
            '/carts',
            {
              product: this.$route.params.id,
              amount: this.number
            },
            {
              headers: {
                token: localStorage.getItem('token')
              }
            }
          )
          .then(({ data }) => {
            console.log(data)
            this.$buefy.toast.open({
              type: 'is-red',
              message: 'Added to your cart'
            })
          })
          .catch(err => {
            console.log(err)
            this.$emit('alert', err)
          })
      }
    },
    confirmDelete () {
      const id = this.productDetailed._id
      this.$buefy.dialog.confirm({
        title: 'Deleting product',
        message:
          'Are you sure you want to <b>delete</b> this product? This action cannot be undone.',
        confirmText: 'Delete Product',
        type: 'is-dark',
        size: 'is-small',
        hasIcon: true,
        onConfirm: () => {
          this.axios
            .delete(`/products/${id}`, {
              headers: {
                token: localStorage.getItem('token')
              }
            })
            .then(({ data }) => {
              // console.log(data, 'data deleted')
              // this.$emit('remove')
              this.$buefy.toast.open('Product deleted!')
              this.$router.push('/collections')
            })
            .catch(err => {
              console.log(err)
              this.$emit('alert', err)
            })
        }
      })
    }
  },
  computed: {
    formatPrice () {
      return `IDR ${this.productDetailed.price.toLocaleString()}`
    },
    isAdmin () {
      console.log(localStorage.getItem('isAdmin'))
      return localStorage.getItem('isAdmin')
    }
  },
  created () {
    this.fetchDetailedProduct()
  }
}
</script>

<style lang="scss" scoped>
@import "~bulma/sass/utilities/_all";
@import url("https://fonts.googleapis.com/css?family=Gelasio&display=swap");
@import url("https://fonts.googleapis.com/css?family=Playfair+Display&display=swap");
@import url('https://fonts.googleapis.com/css?family=Abel|Barlow|Josefin+Sans|Varela+Round&display=swap');

// $dustyPink: #B29578;
$primary: red;

.numberContainer {
  width: 100px;
  margin-left: 1px;
  color: $primary;
}
.container {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  // width: 20px !important;
}

figure {
  margin: auto;
}

img {
  /* object-fit: cover; */
  height: 50vh !important;
  width: 50vh !important;
  margin-left: 7vw;
}

.productImage {
  display: flex;
  flex-direction: row;
  margin-left: 15vw;
  margin-top: 50px;
}

.pageProduct {
  display: flex;
  flex-direction: row;
}

.productInfo {
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-left: 60px;
  margin-top: 70px;
}

.detil {
  font-family: 'Josefin Sans', sans-serif;
  font-size: 20px;
}

.button {
  font-family: 'Josefin Sans', sans-serif;
  text-transform: uppercase;
  border-radius: 0 !important;
  font-size: 14px !important;
  padding-top : 15px 32px;
 text-align: center;
  width: 55%;
  height: 42px !important;
}

.button:hover {
  background-color: rgb(56, 57, 58) !important;
}

@import "~bulma";
@import "~buefy/src/scss/buefy";
</style>
