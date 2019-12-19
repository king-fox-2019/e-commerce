<template>
  <div class="container">
    <div v-if="confirming">
      <h3 class="text-center">Waiting for Confirmation</h3>
      <div class="mx-auto row w-100">
        <div
          tag="div"
          class="transaction col-12 d-flex flex-column flex-md-row align-items-center align-items-md-start justify-content-center justify-content-md-start my-3 rounded"
          v-for="transaction in confirming"
          :key="transaction._id"
        >
          <b-carousel
            class="flex-shrink-0"
            :interval="3000"
            img-width="300"
            style="text-shadow: 1px 1px 2px #333; width: 400px !important;"
          >
            <b-carousel-slide
              v-for="item in transaction.items"
              :key="item.name"
              :text="item.name"
              :img-src="item.image"
            ></b-carousel-slide>
          </b-carousel>

          <div
            class="ml-0 ml-md-2 mt-2 mt-md-0 text-center text-sm-left flex-grow-1"
          >
            <p class="mt-3 mb-0 text-muted">
              {{ transaction.updatedAt | formatDate }}
            </p>

            <h3 class="mb-3">{{ transaction.totalPrice | formatCurrency }}</h3>

            <small class="text-muted">
              Item{{ transaction.items.length > 1 ? 's' : '' }}:
              {{
                transaction.items.length > 3
                  ? transaction.items
                      .slice(0, 2)
                      .map(item => item.name)
                      .join(', ') + ', and more...'
                  : transaction.items.map(item => item.name).join(', ')
              }}
            </small>
            <b-button
              class="d-block mt-3"
              variant="outline-primary"
              @click="markDeliver(transaction._id)"
              >Deliver</b-button
            >
          </div>
        </div>
      </div>
    </div>

    <hr />
    <div v-if="delivering">
      <h3 class="text-center">Delivering Items</h3>
      <small class="text-muted d-block text-center"
        >Waiting for your customer delivered confirmation</small
      >
      <div class="mx-auto row w-100">
        <div
          tag="div"
          class="transaction col-12 d-flex flex-column flex-md-row align-items-center align-items-md-start justify-content-center justify-content-md-start my-3 rounded"
          v-for="transaction in delivering"
          :key="transaction._id"
        >
          <b-carousel
            class="flex-shrink-0"
            :interval="3000"
            img-width="300"
            style="text-shadow: 1px 1px 2px #333; width: 400px !important;"
          >
            <b-carousel-slide
              v-for="item in transaction.items"
              :key="item.name"
              :text="item.name"
              :img-src="item.image"
            ></b-carousel-slide>
          </b-carousel>

          <div
            class="ml-0 ml-md-2 mt-2 mt-md-0 text-center text-sm-left flex-grow-1"
          >
            <p class="mt-3 mb-0 text-muted">
              {{ transaction.updatedAt | formatDate }}
            </p>

            <h3 class="mb-3">{{ transaction.totalPrice | formatCurrency }}</h3>

            <small class="text-muted">
              Item{{ transaction.items.length > 1 ? 's' : '' }}:
              {{
                transaction.items.length > 3
                  ? transaction.items
                      .slice(0, 2)
                      .map(item => item.name)
                      .join(', ') + ', and more...'
                  : transaction.items.map(item => item.name).join(', ')
              }}
            </small>
          </div>
        </div>
      </div>
    </div>

    <hr />
    <div v-if="done">
      <h3 class="text-center">Transactions Completed</h3>
      <div class="mx-auto row w-100">
        <div
          tag="div"
          class="transaction col-12 d-flex flex-column flex-md-row align-items-center align-items-md-start justify-content-center justify-content-md-start my-3 rounded"
          v-for="transaction in done"
          :key="transaction._id"
        >
          <b-carousel
            class="flex-shrink-0"
            :interval="3000"
            img-width="300"
            style="text-shadow: 1px 1px 2px #333; width: 400px !important;"
          >
            <b-carousel-slide
              v-for="item in transaction.items"
              :key="item.name"
              :text="item.name"
              :img-src="item.image"
            ></b-carousel-slide>
          </b-carousel>

          <div
            class="ml-0 ml-md-2 mt-2 mt-md-0 text-center text-sm-left flex-grow-1"
          >
            <p class="mt-3 mb-0 text-muted">
              {{ transaction.updatedAt | formatDate }}
            </p>

            <h3 class="mb-3">{{ transaction.totalPrice | formatCurrency }}</h3>

            <small class="text-muted">
              Item{{ transaction.items.length > 1 ? 's' : '' }}:
              {{
                transaction.items.length > 3
                  ? transaction.items
                      .slice(0, 2)
                      .map(item => item.name)
                      .join(', ') + ', and more...'
                  : transaction.items.map(item => item.name).join(', ')
              }}
            </small>
            <p
              :class="{
                'text-success': transaction.status == 'done',
                'text-danger': transaction.status == 'failed'
              }"
            >
              Status: {{ transaction.status }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    transactions() {
      return this.$store.state.admin.transactions
    },
    confirming() {
      const confirming = this.transactions.filter(t => t.status == 'confirming')
      return confirming.length > 0 ? confirming : null
    },
    delivering() {
      const delivering = this.transactions.filter(t => t.status == 'delivering')
      return delivering.length > 0 ? delivering : null
    },
    done() {
      const done = this.transactions.filter(
        t => t.status == 'done' || t.status == 'failed'
      )
      return done.length > 0 ? done : null
    }
  },
  methods: {
    markDeliver(id) {
      this.$store.dispatch('MARK_DELIVER', id)
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  padding-top: 5.7rem;

  hr {
    border-width: 3px;
  }

  .transaction {
    height: 15rem;
    overflow-y: hidden;
  }
}
</style>
