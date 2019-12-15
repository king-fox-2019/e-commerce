<template>
  <div class="container">
    <div class="mx-auto text-center">
      <b-button
        class="px-5"
        variant="outline-primary"
        size="lg"
        @mouseenter="checkoutHover = true"
        @mouseleave="checkoutHover = false"
        @click="checkoutCart"
        v-if="items"
      >
        {{
          checkoutHover
            ? 'Checkout'
            : `Total: ${formatCurrencry(
                items
                  .map(item => item.item.price * item.amount)
                  .reduce((r, i) => r + i)
              )}`
        }}
      </b-button>
    </div>
    <div class="mx-auto row w-100" id="cart">
      <router-link
        tag="div"
        class="item col-12 p-0 d-flex flex-column flex-md-row align-items-center justify-content-center justify-content-md-start my-3 rounded"
        v-for="item in items"
        :key="item.item._id"
        :to="`/items/${item.item._id}`"
      >
        <!-- <figure class="border flex-shrink-1"> -->
        <b-img :src="item.item.image" width="300" fluid></b-img>
        <!-- </figure> -->
        <div class="ml-0 ml-md-3 mt-2 mt-md-0 text-center text-sm-left">
          <h4 class="mb-0">{{ item.item.name }}</h4>
          <small class="text-muted">
            {{ item.amount }} pcs x
            {{ item.item.price | formatCurrency }}
          </small>
          <h5 class="mt-4">
            {{ (item.item.price * item.amount) | formatCurrency }}
          </h5>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fields: [
        {
          key: 'name',
          label: 'Product Name'
        },
        {
          key: 'price',
          label: 'Product Price'
        },
        {
          key: 'qty',
          label: 'QTY'
        },
        {
          key: 'total',
          label: 'Total'
        }
      ],
      checkoutHover: false
    }
  },
  computed: {
    items() {
      return this.$store.state.user.cart.items
    }
  },
  methods: {
    formatCurrencry(value) {
      if (!value) return ''
      return value.toLocaleString('id', { style: 'currency', currency: 'IDR' })
    },
    checkoutCart() {
      const loader = this.$loading.show()
      this.$store
        .dispatch('CHECKOUT_TRANSACTION')
        .then(({ data }) => {
          this.$toasted.show(data.message)
          this.$router.push('/transactions')
        })
        .catch(({ response }) => {
          if (response) {
            const message = response.data.message
            if (typeof message != 'string') {
              response.data.message.forEach(msg => {
                this.$toasted.show(msg, { className: 'bg-danger' })
              })
            } else {
              this.$toasted.show(response.data.message, {
                className: 'bg-danger'
              })
            }
          } else {
            this.$toasted.show('Something went wrong', {
              className: 'bg-danger'
            })
          }
        })
        .finally(() => loader.hide())
    }
  },
  created() {
    this.$store.dispatch('FETCH_USER_DATA').then(() => {
      if (!this.$store.state.user.onSession) {
        this.$router.replace('/session?from=/cart&on=signin')
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100%;
  padding-top: 5.7rem;

  #cart {
    .item {
      cursor: pointer;
      border: 1px solid transparent;

      &:hover {
        border: 1px solid #e3e6ea;
        box-shadow: 1px 1px 5px -3px var(--accent);
      }
    }

    // tbody {
    //   cursor: pointer !important;
    // }
  }
}
</style>
