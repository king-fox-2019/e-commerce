<template>
  <div style="background-color:rgb(245, 246, 242)" class="single">
    <div class="row single2">
      <div style="padding:60px;" class="col-sm-6 col-md-6 col-xs-12 py-5">
        <div class="titlesingle row">{{singleProduct.name}}</div>
        <div class="descsingle row">{{singleProduct.description}}</div>
        <hr />
        <div class="row">
          <div class="col-lg-6 col-md-12 sm-12 py-2">
            <div
              v-if="singleProduct.price"
              class="border-right pricesingle row"
            >IDR {{singleProduct.price.toLocaleString()}}</div>
          </div>
          <div class="col-lg-6 col-md-12 sm-12">
            <div
              class="stocksingle py-2 px-3 row"
            >Stock : {{singleProduct.stock !== 0 ? singleProduct.stock : "out of stock"}}</div>
          </div>
          <div class="row ml-1" style="width: 500px" d-flex flex-row>
            <div id="quantity">
              <button
                @click.prevent="minus()"
                style="border-right:0px;"
                class="btn btnsingle qty-btn"
              >
                <i class="fas fa-minus"></i>
              </button>
              <div class="text-align-center qty-btnmid">
                <span class="inc text-center">{{total}}</span>
              </div>
              <button @click.prevent="plus()" style="border-left:0px;" class="btn qty-btn">
                <i class="fas fa-plus"></i>
              </button>
            </div>
            <div class="sm-12">
              <div v-if="$store.state.isLogin">
                <button
                  v-if=" singleProduct.stock > 0"
                  @click.prevent="addToCart(singleProduct)"
                  class="btn btn-dark atc"
                >Add To Cart</button>
                <button
                  v-else
                  @click.prevent="addToCart(singleProduct)"
                  class="btn btn-dark atc"
                  disabled
                >Add To Cart</button>
              </div>
              <div v-else>
                <a
                  data-toggle="modal"
                  data-target="#loginmodal"
                  class="btn btn-dark atc"
                  style="color: white;"
                  to="/login"
                >Add To Cart</a>
              </div>
            </div>
          </div>
        </div>
        <div class="row"></div>
      </div>
      <div v-if="singleProduct.image" class="col-sm-6 col-md-6 col-xs-12 cont-img">
        <img :src="singleProduct.image" class="card-img" alt="..." />
      </div>
    </div>
    <div class="row" style="height:10vh; ;background-color:rgb(245, 246, 242)"></div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import { mapState } from "vuex";
export default {
  props: [],
  created() {
    // this.id = this.$route.params.id;
    // console.log("id dari router ", this.id);
    // console.log("ini products dari state store", this.products);
    // let a = this.products.filter(product => {
    //   return product._id === this.id;
    // });s
    // console.log(a[0], "============");
    if (this.$route.params.id != undefined) {
      this.fetchSingleProduct(this.$route.params.id);
      console.log(this.$route.params.id);
    } else {
      Swal.fire("Something went wrong", "Please reload the page", "warning");
    }
  },
  data() {
    return {
      id: null,
      singleProduct: {},
      total: 1
    };
  },
  methods: {
    fetchSingleProduct(id) {
      let payload = id;
      this.$store
        .dispatch("singleProduct", payload)
        .then(data => {
          this.singleProduct = data;
          console.log(`masuuuk detail product`, this.singleProduct);
        })
        .catch(err => {
          console.log(err);
          Swal.fire(`Something went wrong`, "Please reload", `error`);
        });
    },
    plus() {
      if (this.total < this.singleProduct.stock) {
        this.total++;
      }
    },
    minus() {
      if (this.total > 0) {
        this.total--;
      }
    },
    addToCart(objProduct) {
      if (this.$store.state.isLogin) {
        objProduct.quantity = this.total;
        console.log(objProduct);
        this.$store
          .dispatch("addToCart", objProduct)
          .then(data => {
            return this.$store.dispatch("viewCart");
          })
          .then(data => {
            Swal.fire("Added to cart", "You may continue shopping", "success");
          })
          .catch(err => {
            Swal.fire(
              "Something went wrong",
              "Please reload the page",
              "warning"
            );
            console.log(err, "errr");
          });
      } else {
        this.$router.push("/login");
      }
    }
  },
  computed: {
    ...mapState(["products"])
  },

  watch: {
    $route() {
      if (this.$route.params.id != undefined) {
        this.fetchSingleProduct(this.$route.params.id);
        console.log(this.$route.params.id);
      }
    }
  }
};
</script>

<style scoped>
.single {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 150px 0 150px;
}
.single2 {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
}
.inc {
  margin-top: 5px;
  padding-top: 6px;
  padding-bottom: 7px;
  border-top: 1px solid grey;
  border-bottom: 1px solid grey;
}
.titlesingle {
  height: 7rem;
  font-weight: 600;
  font-size: 40px;
}
.descsingle {
  height: 7rem;
  font-weight: 400;
  font-size: 15px;
  letter-spacing: 0.13em;
}

.pricesingle {
  height: 4rem;
  font-weight: 600;
  font-size: 20px;
  letter-spacing: 0.1em;
}
.stocksingle {
  height: 4rem;
}

.atc {
  border-radius: 0px;
  color: white;
}

#quantity {
  height: auto;
  width: 80px;
  margin-right: 15px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  /* border: 1px darkgray solid; */
}

.qty-btn {
  background-color: white;
  border-radius: 0px;
  color: darkgray;
  border: 1px solid grey;
}
.card-img {
  max-width: 100%;
  max-height: 100vh;
  width: auto;
  height: 90vh;
  object-fit: contain;
}
.cont-img {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
