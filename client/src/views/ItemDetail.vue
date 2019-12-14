<template>
  <div id="item-detail">
    <div class="row" id="item-wrapper">
      <div class="col-12 col-md-5">
        <div class="ml-5 my-3">
          <b-img class="border" :src="item.image" fluid-grow rounded></b-img>
        </div>
      </div>
      <div class="col p-0">
        <div class="my-3" style="margin-left: 2.4rem;">
          <h1 class="mb-0">{{ item.name }}</h1>
          <p class="text-muted mb-4">Stock left: {{ item.stock }}</p>
          <small
            class="text-muted"
            style="text-decoration: line-through gray;"
            >{{ item.price | mockDiscount | formatCurrency }}</small
          >
          <h3 class="text-danger">{{ item.price | formatCurrency }}</h3>
          <div class="d-flex flex-wrap align-items-center mt-3">
            <!-- <vue-numeric-input
              class="mr-3 form-control"
              v-model="amount"
              :min="1"
              :max="item.stock"
              :step="1"
              align="center"
              size="6rem"
              id="amount-input"
            ></vue-numeric-input>-->
            <integer-plusminus
              class="mr-3"
              :min="0"
              :max="item.stock"
              :step="1"
              v-model="amount"
            >
              <!-- <p>Your value is</p>
              {{ ipm_value }}-->

              <template slot="decrement">-</template>

              <template slot="increment">+</template>
            </integer-plusminus>
            <b-button
              variant="danger"
              v-if="onSession"
              @click="updateCart"
              :disabled="isLoading ? true : false"
              v-html="
                isLoading || amount == 0
                  ? 'Remove from Cart'
                  : itemCarted
                  ? 'Update Amount'
                  : 'Add to Cart'
              "
            ></b-button>
            <b-button
              variant="primary"
              v-else
              :to="`/session?from=${$route.fullPath}&on=signin`"
              >Sign In and Add to Cart</b-button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { IntegerPlusminus } from 'vue-integer-plusminus'

export default {
  components: {
    IntegerPlusminus
  },
  props: ['id'],
  data() {
    return {
      item: {},
      amount: 1,
      isLoading: ''
    }
  },
  computed: {
    onSession() {
      return this.$store.state.user.onSession
    },
    itemCarted() {
      if (this.$store.state.user.cart.items) {
        for (const item of this.$store.state.user.cart.items) {
          if (item.item._id == this.id) return item
        }
      }
      return null
    }
  },
  watch: {
    itemCarted(val) {
      if (val.item._id) {
        this.amount = val.amount
      }
    }
  },
  methods: {
    updateCart() {
      this.isLoading = '<span class="spinner-border spinner-border-sm"></span>'
      this.$store
        .dispatch('UPDATE_CART', {
          item: this.id,
          amount: this.amount
        })
        .then(({ data }) => {
          this.$toasted.show(data.message)
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
        .finally(() => {
          this.amount = 1
          this.isLoading = ''
        })
    }
  },
  filters: {
    mockDiscount(val) {
      if (!val) return 0
      return (100 / 60) * val
    }
  },
  created() {
    this.$store.dispatch('FETCH_USER_DATA')
    this.$store.dispatch('GET_ITEM_DETAIL', this.id).then(({ data }) => {
      this.item = data.data
    })
  }
}
</script>

<style lang="scss">
@import '@/assets/css/main.scss';

#item-detail {
  height: 100%;

  #item-wrapper {
    padding-top: 5.7rem;
  }
}

.int-pm {
  overflow: hidden;
  height: 35px;
  align-items: center;
}

.int-pm-value {
  font-weight: bold;
  align-items: center !important;
  height: 100% !important;
  padding: 0 1rem !important;
  line-height: 2;
}

.int-pm-btn {
  @extend .btn;
  @extend .text-light;
  background-color: $accent !important;
}

.int-pm-decrement {
  border-top-right-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
}

.int-pm-increment {
  border-top-left-radius: 0 !important;
  border-bottom-left-radius: 0 !important;
}

// #amount-input.vue-numeric-input {
//   // padding-top: 1.5rem;
//   // padding-bottom: 1.5rem;
// }
// #amount-input.vue-numeric-input .numeric-input {
//   // padding-right: 5px !important;
//   // padding-left: 5px !important;
// }
// #amount-input.vue-numeric-input .btn {
//   background: #6fbbff !important;
// }
// #amount-input.vue-numeric-input .btn-increment {
//   height: 1.5rem;
//   width: 100%;
//   right: 0 !important;
//   left: 0 !important;
//   top: 0 !important;
//   bottom: auto !important;
// }
// #amount-input.vue-numeric-input .btn-decrement {
//   height: 1.5rem;
//   width: 100%;
//   left: 0 !important;
//   right: 0 !important;
//   top: auto !important;
//   bottom: 0 !important;
// }
</style>
