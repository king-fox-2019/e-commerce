<template>
  <div class="container">
    <div v-if="confirming">
      <h3 class="text-center">Waiting for Admin Confirmation</h3>
      <small class="text-muted d-block text-center"
        >This may take a while, please wait</small
      >
      <div class="mx-auto row w-100">
        <router-link
          tag="div"
          class="transaction col-12 d-flex flex-column flex-md-row align-items-center align-items-md-start justify-content-center justify-content-md-start my-3 rounded"
          v-for="transaction in confirming"
          :key="transaction._id"
          :to="`/transactions/${transaction._id}`"
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
        </router-link>
      </div>
    </div>

    <div v-if="delivering">
      <h3 class="text-center">Delivering Items</h3>
      <small class="text-muted d-block text-center"
        >Waiting for your confirmation when the items arrived</small
      >
      <div class="mx-auto row w-100">
        <router-link
          tag="div"
          class="transaction col-12 d-flex flex-column flex-md-row align-items-center align-items-md-start justify-content-center justify-content-md-start my-3 rounded"
          v-for="transaction in delivering"
          :key="transaction._id"
          :to="`/transactions/${transaction._id}`"
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
        </router-link>
      </div>
    </div>

    <div v-if="done">
      <h3 class="text-center">Transactions Completed</h3>
      <small class="text-muted d-block text-center"
        >Thank you, we wait for your next order!</small
      >
      <div class="mx-auto row w-100">
        <router-link
          tag="div"
          class="transaction col-12 d-flex flex-column flex-md-row align-items-center align-items-md-start justify-content-center justify-content-md-start my-3 rounded"
          v-for="transaction in done"
          :key="transaction._id"
          :to="`/transactions/${transaction._id}`"
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
        </router-link>
      </div>
    </div>

    <div v-if="failed">
      <h3 class="text-center">Transactions Rejected</h3>
      <small class="text-muted d-block text-center"
        >Sometimes things happen, sorry</small
      >
      <div class="mx-auto row w-100">
        <router-link
          tag="div"
          class="transaction col-12 d-flex flex-column flex-md-row align-items-center align-items-md-start justify-content-center justify-content-md-start my-3 rounded"
          v-for="transaction in failed"
          :key="transaction._id"
          :to="`/transactions/${transaction._id}`"
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
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    transactions() {
      return this.$store.state.user.transactions
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
      const done = this.transactions.filter(t => t.status == 'done')
      return done.length > 0 ? done : null
    },
    failed() {
      const failed = this.transactions.filter(t => t.status == 'failed')
      return failed.length > 0 ? failed : null
    }
  },
  created() {
    this.$store.dispatch('FETCH_USER_DATA').then(() => {
      if (!this.$store.state.user.onSession) {
        this.$router.replace('/session?from=/transactions&on=signin')
      } else {
        this.$store.dispatch('FETCH_USER_TRANSACTIONS')
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100%;
  padding-top: 5.7rem;

  .transaction {
    cursor: pointer;
    border: 1px solid transparent;

    &:hover {
      border: 1px solid #e3e6ea;
      box-shadow: 1px 1px 5px -3px var(--accent);
    }
  }
}
</style>
