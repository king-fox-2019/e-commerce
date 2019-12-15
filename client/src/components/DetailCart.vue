<template>
<div>
  <div class="columns">
    <div class="column">
      <figure class="image is-126x126">
      <img style="margin-right: 4%;" :src="cart.product.imageSource">
      </figure>
    </div>
      <div class="column" style="text-align: left; margin-top: 2%; margin-left: 9%;">
        <div style="font-family: 'Gelasio', serif; font-weight: 900; font-size: 17px;letter-spacing: 2px;">{{cart.product.name}}</div>
        <!-- {{cart.product}} -->
        <div style="font-family: 'Josefin Sans', sans-serif; letter-spacing: 1px;">stock: {{cart.product.stock}}</div>
        <div style="font-family: 'Josefin Sans', sans-serif; letter-spacing: 1px;">{{price}}</div>
      </div>
      <div class="column" style="text-align: left; margin-top: 3%;">
        <!-- {{ cart.amount }} -->
         <!-- increment  -->
          <div class="container">
            <b-button type="is-text"  @click="updateDown" :disabled="cart.amount === 1"><i class="fas fa-minus"></i></b-button>
            <div style="margin-top: 6%; margin-left: 10%; margin-right: 10%;">{{cart.amount}}</div>
            <b-button type="is-text" @click="updateUp" :disabled="cart.amount >= cart.product.stock"><i class="fas fa-plus"></i></b-button>
          </div>
          <!-- increment  -->
      </div>
      <div  class="column" style="margin-top: 4%;" @click="confirmDelete" ><span style="cursor: pointer; font-family: 'Josefin Sans', sans-serif; letter-spacing: 2px;">Delete</span></div>
      <div class="column" style="margin-top: 4%; font-family: 'Josefin Sans', sans-serif; letter-spacing: 1px;">{{ totalPrice }}</div>
  </div>
  <hr>
</div>
</template>

<script>
export default {
  props: ['cart'],
  data () {
    return {
      // number: 0
    }
  },
  methods: {
    updateUp () {
      this.cart.amount++

      const id = this.cart._id
      const { amount } = this.cart

      if (amount <= this.cart.product.stock) {
        this.axios.patch(`/carts/${id}`, {
          amount
        }, {
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(({ data }) => {
            console.log(data, 'dr detil cart, yg mo di updateee nambahhhh')
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    updateDown () {
      this.cart.amount--

      const id = this.cart._id
      const { amount } = this.cart
      this.axios.patch(`/carts/${id}`, {
        amount
      }, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          console.log(data, 'dr detil cart, yg mo di updateee kurangggg')
        })
        .catch(err => {
          console.log(err)
        })
    },
    confirmDelete () {
      this.$buefy.dialog.confirm({
        title: 'Deleting cart',
        message:
          'Are you sure you want to <b>delete</b> this cart? This action cannot be undone.',
        confirmText: 'Delete Cart',
        type: 'is-dark',
        size: 'is-small',
        hasIcon: true,
        onConfirm: () => {
          const id = this.cart._id
          this.axios
            .delete(`/carts/${id}`, {
              headers: {
                token: localStorage.getItem('token')
              }
            })
            .then(({ data }) => {
              // console.log(data, 'data deleted')
              // this.$emit('remove')
              this.$buefy.toast.open('Cart deleted!')
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
    totalPrice () {
      const total = this.cart.product.price * this.cart.amount
      return `IDR ${total.toLocaleString()}`
    },
    price () {
      return `IDR ${this.cart.product.price.toLocaleString()}`
    }
    // amount () {
    //   this.number = this.cart.amount
    //   return this.number
    // }
  },
  watch: {
    number () {
      console.log('aaaaaaaaa')
    }
  }
}

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Gelasio&display=swap');
@import url('https://fonts.googleapis.com/css?family=Abel|Barlow|Josefin+Sans|Varela+Round&display=swap');

img {
  width: 160px;
  height: 160px;
  margin: auto;
}
columns {
  width: 90px !important;
}
.container {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 90px !important;
}

hr {
  width: 80vw !important;
  border: 1px solid rgb(226, 221, 221) !important;
  margin-left: 3%;
}

.column {
  width: 100vw;
}

</style>
