<template>
  <div>
    <div class="d-flex justify-content-center align-items-center header">
      <router-link to="/" class="back">
        <i class="fas fa-home mr-3"></i>
      </router-link>
      Shoping Cart
    </div>
    <div class="d-flex flex-row bd-highlight justify-content-center mb-5 mt-5">
      <div class="p-2 col-3 bd-highlight">
        <div class="ml-3 mr-3 head active">
          <i class="fas fa-shopping-cart"></i>
        </div>
      </div>
      <div class="p-2 col-3 bd-highlight">
        <div class=" ml-3 mr-3 head">
          <i class="far fa-money-bill-alt mr-2"></i>
        </div>
      </div>
      <div class="p-2 col-3 bd-highlight">
        <div class=" ml-3 mr-3 head">
          <i class="fas fa-check"></i>
        </div>
      </div>
    </div>
    <div class="d-flex bd-highlight">
      <div class="p-2 flex-grow-1 bd-highlight item p-4">
          <div class="row tax">
            <div class="col-1 icon mt-3">
              <i class="fas fa-exclamation-circle icon"></i>
            </div>
            <div class="col-11 class warning mt-3 mb-3">
              <div class="title">PPh 22, Article 22 of Income Tax on gold bars</div>
              <div>
                In accordance with PMK No. 34 / PMK.10 / 2017, gold bar purchases are
                subject to PPh 22 of 0.45% (for NPWP holders and 0.9% for non NPWP).
                Every purchase of gold bars is accompanied by a proof of income tax 22.
              </div>
            </div>
          </div>
          <div class="row card mt-4">
            <b-card class="card">
              <b-card-text>
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">Product</th>
                      <th scope="col"></th>
                      <th scope="col">Price</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Subtotal</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in dataCart" :key="item.id">
                      <th>
                        <img :src="item.image" class="image-item">
                      </th>
                      <td>{{ item.name }} -
                        <br> {{ item.weight }} gr
                      </td>
                      <td>Rp. {{item.price.toLocaleString("id")}}</td>
                      <td><span class="input-group-text qty"> {{item.qty}} </span></td>
                      <td>Rp. {{(item.qty * item.price).toLocaleString("id")}}</td>
                      <td>
                        <b-button @click.prevent="plus(item)"
                        variant="primary" class="indep op">
                        <i class="fas fa-plus"></i></b-button>
                        <b-button @click.prevent="destroy(item)"
                        variant="primary" class="indep op">
                        <i class="fas fa-minus"></i></b-button></td>
                    </tr>
                  </tbody>
                </table>
              </b-card-text>
            </b-card>
          </div>
      </div>
      <div class="p-2 bd-highlight cart-item p-4">
        <CartOrder />
      </div>
    </div>
    <div>
       <b-button @click.prevent="backShop" variant="primary"
       class="indep mt-3 mb-5 ml-5 mr-5 pt-3 pb-3">
         <i class="fas fa-shopping-cart mr-3"></i>Back to Shopping</b-button>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import CartOrder from '../components/CardOrder.vue';

export default {
  data() {
    return {
      status: 'onGoing',
    };
  },
  name: 'Cart',
  components: {
    CartOrder,
  },
  methods: {
    backShop() {
      this.$router.push('/purchase/gold');
    },
    plus(item) {
      let cartItem = this.cartList;
      cartItem.push(item);
      this.$store.commit('SET_CART', cartItem);
    },
    destroy(item) {
      Swal.fire({
        title: 'Are you sure?',
        text: 'Back to Shopping this!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then((result) => {
        if (result.value) {
          let cartItem = this.cartList;
          let index = null;
          for (let i = 0; i < cartItem.length; i += 1) {
            if (cartItem[i]._id === item._id) {
              index = i;
              break;
            }
          }
          cartItem.splice(index, 1);
          this.$store.commit('SET_CART', cartItem);
          Swal.fire(
            'Deleted!',
            'Your item has been deleted.',
            'success',
          );
        }
      });
    },
  },
  computed: {
    cartList() {
      return this.$store.state.cart;
    },
    dataCart() {
      const products = this.$store.state.cart;
      let result = [];
      for (let i = 0; i < products.length; i += 1) {
        products[i].qty = 0;
        let temp = false;
        for (let j = 0; j < result.length; j += 1) {
          if (result[j]._id === products[i]._id) {
            temp = true;
          }
        }
        if (temp === false) {
          result.push(products[i]);
        }
      }

      for (let i = 0; i < result.length; i += 1) {
        for (let j = 0; j < products.length; j += 1) {
          if (products[j]._id === result[i]._id) {
            result[i].qty += 1;
          }
        }
      }

      return result;
    },
  },
  created() {
    const valid = localStorage.getItem('token');
    if (!valid) {
      this.$router.push('/');
    }
  },
};
</script>

<style scoped>
  .header {
    height: 50px;
    background-color: #f1f1f1;
    font-weight: bold;
    color: #cb9b2d;
  }

  .cart-item {
    width: 50% !important
  }

  .tax {
    /* height: 100px; */
    color:rgb(174, 174, 174);
    font-size: 12px;
    border: 1px solid gainsboro;
    border-radius: 10px
  }

  .item {
    padding-left: 35px !important;
  }

  .icon {
    font-size: 20px
  }

  .warning {
    text-align: left
  }

  .title {
    font-size: 16px;
    font-weight: bold
  }

  .back {
    color: #cb9b2d;
    font-weight: bold;
    text-decoration: underline;
  }

  .back:hover {
    color: #927020;
  }

  .card {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1);
    border-radius: 8px !important;
    border: none;
    text-align: left;
  }

  .image-item {
    width: 120px
  }

  .indep,
  .indep:focus {
    background-color: #cb9b2d !important;
    border: #cb9b2d !important;
    box-shadow: none !important;
    /* width: 200px; */
    font-weight: bold;
  }
  .indep:hover {
    background-color: #927020 !important;
    border: #927020 !important;
  }

  .qty {
    width: 50px !important
  }

  .op {
    border-radius: 0px !important;
    font-size: 10px
  }

  .head {
    height: 120px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #927020;
    border: 1px solid #927020;
    font-size: 62px
  }

  .active {
    color: white;
    background-color: #23427e;
    border: 1px solid #23427e;
  }
</style>
