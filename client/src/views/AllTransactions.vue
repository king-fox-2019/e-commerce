<template>
  <div id="mycart">
    <div class="header-text">
      <h1 class="is-size-4 my-3 has-text-centered">All Transactions</h1>
    </div>

    <section class="mx-5">
      <b-table
        :data="isEmpty ? [] : allTransactions"
        :striped="isStriped"
        :hoverable="isHoverable"
        :mobile-cards="hasMobileCards"
      >
        <template slot-scope="props">
          <b-table-column field="order_id" label="Order ID" centered>{{ props.row._id }}</b-table-column>

          <b-table-column field="customer" label="Customer" centered>{{ props.row.cart.user.name }}</b-table-column>

          <b-table-column field="email" label="Email" centered>{{ props.row.cart.user.email }}</b-table-column>

          <b-table-column field="date" label="Order Date" centered>
            <span class="tag is-success">{{ new Date(props.row.cart.updatedAt).toLocaleString() }}</span>
          </b-table-column>

          <b-table-column field="details" label="Details" centered>
            <b-button @click="toggleTransactionDetails"
              class="mb-3"
              :id="props.row._id">
              Details
            </b-button>

            <div v-if="$route.params.id === props.row._id">
              <router-view>
              </router-view>
            </div>
          </b-table-column>

          <b-table-column field="status" label="Status" centered>
            <b-dropdown aria-role="menu">
              <a class="navbar-item" slot="trigger" role="button">
                <span>{{ props.row.status }}</span>
                <b-icon icon="menu-down"></b-icon>
              </a>

              <b-dropdown-item
                :id="props.row._id"
                @click.native="updateStatusToPreparing"
                aria-role="listitem"
              >preparing</b-dropdown-item>

              <b-dropdown-item
                :id="props.row._id"
                @click.native="updateStatusToDelivering"
                aria-role="listitem"
              >delivering</b-dropdown-item>

              <b-dropdown-item
                :id="props.row._id"
                @click.native="updateStatusToReceived"
                aria-role="listitem"
              >received</b-dropdown-item>

            </b-dropdown>
          </b-table-column>
        </template>

        <template slot="empty">
          <section class="section">
            <div class="content has-text-grey has-text-centered">
              <p>
                <b-icon icon="emoticon-sad" size="is-large"></b-icon>
              </p>
              <p>Nothing here.</p>
            </div>
          </section>
        </template>
      </b-table>
    </section>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ProductCardCart from "../components/ProductCardCart";
import ProductCardCartTransaction from "../components/ProductCardCartTransaction";
import axios from "../../config/axios";
import toastMixin from "../mixins/toastMixin";

export default {
  name: "all-transactions",

  data() {
    return {
      data,
      isEmpty: false,
      isStriped: false,
      isHoverable: false,
      hasMobileCards: true,

      transactionDetailsActive: true
    };
  },

  methods: {
    updateStatusToPreparing: async function(event) {
      try {
        // console.log('ini event pas diklik', event)
        await axios({
          method: "patch",
          url: `/transactions/${event.currentTarget.id}`,
          headers: {
            access_token: localStorage.getItem("access_token")
          },
          data: {
            status: 'preparing'
          }
        }).then(({ data }) => {
          // console.log('ini updated cart', data);
          this.success(data.message);
          this.$store.dispatch("fetchAllTransactions");
          this.getTransactionDetail()
        })

      } catch (error) {
        console.log(error)
        this.danger(error.response.data.messages[0])
      }
    },

    updateStatusToDelivering: async function(event) {
      try {
        await axios({
          method: "patch",
          url: `/transactions/${event.currentTarget.id}`,
          headers: {
            access_token: localStorage.getItem("access_token")
          },
          data: {
            status: 'delivering'
          }
        }).then(({ data }) => {
          // console.log('ini updated cart', data);
          this.success(data.message);
          this.$store.dispatch("fetchAllTransactions")
          this.getTransactionDetail()
        })

      } catch (error) {
        console.log(error)
        this.danger(error.response.data.messages[0])
      }
    },

    updateStatusToReceived: async function(event) {
      try {
        await axios({
          method: "patch",
          url: `/transactions/${event.currentTarget.id}`,
          headers: {
            access_token: localStorage.getItem("access_token")
          },
          data: {
            status: 'receiving'
          }
        }).then(({ data }) => {
          // console.log('ini updated cart', data);
          this.success(data.message);
          this.$store.dispatch("fetchAllTransactions")
          this.getTransactionDetail()
        })

      } catch (error) {
        console.log(error)
        this.danger(error.response.data.messages[0])
      }
    },

    toggleTransactionDetails: function() {
      // console.log('ini route saat ini', this.$route)
      if (this.$route.path === '/all-transactions/' + event.currentTarget.id) {
        this.$router.push('/all-transactions')
      } else {
        this.$router.push('/all-transactions/' + event.currentTarget.id)
      }
    },

    getTransactionDetail: async function() {
      try {
        await axios({
          method: 'get',
          url: '/transactions/' + this.$route.params.id,
          headers: {
            access_token: localStorage.getItem("access_token")
          }
        })
        .then(({ data }) => {
          // this.transaction = data.transaction
          this.$store.commit('FETCH_A_TRANSACTION', data.transaction)
        })

      } catch (error) {
        console.log(error)
        this.danger(error.response.data.messages[0])
      }
    }
  },

  created() {
    this.$store.dispatch("fetchAllTransactions");
  },

  computed: {
    ...mapState(["allTransactions"])
  },

  mixins: [toastMixin]
};
</script>

<style scoped>
#mycart {
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  /* align-items: left; */

  background-image: url("../assets/1511.jpg");
  background-repeat: no-repeat;
  background-size: cover;

  min-height: calc(100vh - 75px);
  padding-bottom: 50px;
}

.button {
  font-size: 14px !important;
}

hr {
  margin: 1% 0;
}

.header-text {
  margin: 10px 10%;
  margin-left: 10%;
}

.header-text > h1 {
  color: white;
  font-weight: 700;
}

.cart-container {
  margin: 0 10%;
  background-color: white;
  border-radius: 1%;
  box-shadow: 2px 2px 5px 1px rgba(0, 0, 0, 0.08);
}

.checkout-container {
  margin: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.checkout-container > p {
  margin-right: 25px;
}

.shopping-cart-img {
  width: 25px;
  height: 25px;
  margin-right: 10px;
}

.products-container {
  margin: 0 5%;
  margin-bottom: 5%;
}

.checkout-process {
  opacity: 30%;
}

.active {
  opacity: 100%;
}
</style>