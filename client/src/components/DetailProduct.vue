<template>
  <div class="ui grid container" style="margin-top:50px;margin-bottom:50px">
    <div class="eight wide column">
      <div style="height:500px;width:500px">
        <img
          height="500px"
          width="500px"
          class="img-product enable-button"
          :src="currentProduct.image"
          :data-zoom="currentProduct.image"
          ref="imageItem"
          alt
        />
      </div>
    </div>
    <div class="eight wide column">
      <div style="position:absolute;height:200px;width:200px;margin-top:300px" ref="zoomPreview"></div>
      <div class="product-info" style="height:500px;text-align:left">
        <h1>{{ currentProduct.name }}</h1>
        <h2>
          <div class="ui grid">
            <div class="three wide column">Price</div>
            <div class="thirteen wide column">: {{ rupiahFormat }}</div>
          </div>
        </h2>
        <h3>
          <div class="ui grid">
            <div class="three wide column">Stock</div>
            <div class="thirteen wide column">: {{ currentProduct.stock }}</div>
          </div>
        </h3>
        <h3>
          <div class="ui input grid">
            <div class="three wide column">Qty</div>
            <div class="thirteen wide column">
              :
              <input
                v-model="qty"
                type="number"
                placeholder="qty"
                style="text-align:left;width:100px;border:0px solid black;border-radius:0px;background-color:transparent"
              />
            </div>
          </div>
        </h3>
        <div>
          <button
            @click.prevent="addToCart(currentProduct)"
            class="ui black button"
            style="border-radius:0px;margin-top:25px"
          >Add To Cart</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Drift from "drift-zoom";
import { mapState } from "vuex";
import Swal from "sweetalert2";
import convertRupiah from "rupiah-format";

export default {
  data() {
    return {
      qty: 0
    };
  },
  methods: {
    checkLogin() {
      const access = this.onSession;
      if (!access) {
        this.$router.push("/signin");
      }
    },
    addToCart(item) {
      if (this.qty === 0 || this.qty < 0) {
        Swal.fire({
          title: "Warning!",
          text: "Enter the amount to be purchased correctly!",
          icon: "warning",
          confirmButtonColor: "#3085d6"
        });
      } else {
        this.checkLogin();
        const qty = this.qty;
        const isAvailable = Number(item.stock) - qty >= 0;
        if (isAvailable) {
          const command = "add";
          const payload = {
            item,
            qty,
            command
          };
          const _id = this.$route.params.id;
          const payloadCurrentCart = {
            _id
          };
          this.$store.dispatch("updateCart", payload).then(data => {
            this.qty = 0;
            this.$store.dispatch("getCurrentProduct", payloadCurrentCart);
            this.$store.dispatch("fetchCartUser");
            this.$store.dispatch("fetchProducts");
            Swal.fire("Success!", data.message, "success");
          });
        } else {
          Swal.fire({
            title: "Warning!",
            text: "The item you want is currently not available.",
            icon: "warning",
            confirmButtonColor: "#3085d6"
          });
        }
      }
    }
  },
  components: {},
  computed: {
    rupiahFormat() {
      return convertRupiah.convert(this.currentProduct.price);
    },
    ...mapState(["currentProduct", "onSession"])
  },
  created() {
    const _id = this.$route.params.id;
    const payload = {
      _id
    };
    this.$store.dispatch("getCurrentProduct", payload);
  },
  mounted() {
    new Drift(this.$refs.imageItem, {
      paneContainer: this.$refs.zoomPreview,
      inlinePane: false
    });
  }
};
</script>

<style>
.img-product {
  height: 500px;
}
</style>
