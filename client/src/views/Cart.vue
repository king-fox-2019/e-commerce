<template>
  <div>
    <h1>My Cart</h1>
    <div class="middleDiv">
      <div v-for="(item, index) in allCart" :key="index">
        <Card :productData="item" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Card from "../components/Card";

export default {
  name: "cart",
  components: {
    Card
  },
  data() {
    return {};
  },
  beforeMount() {
    // console.log("masuk created");
    this.fetchCarts();
  },
  computed: {
    ...mapGetters({
      allCart: "getCart"
    })
  },
  methods: {
    ...mapActions({
      fetchCarts: "fetchCart"
    })
  }
};
</script>

<style scoped>
.middleDiv {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: row wrap;
}
</style>