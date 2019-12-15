<template>
  <div>
    <div v-for="(item, index) in allCart" :key="index">
        <Card :productData="item"/>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Card from '../components/Card';

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

<style>
</style>