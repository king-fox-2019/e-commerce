<template>
  <b-card class="prod-box my-2">
    <div class="img-wrap text-center">
      <img class="prod-img border" 
        :src="prod.image"
      >
    </div>
    <figcaption class="info-wrap mt-4">
      <span class="item-name">{{ prod.name }}</span>
      <small class="text-muted">Stock: {{ prod.stock }}</small>
      <div class="price">Rp. {{ prod.price }}</div>
    </figcaption>
    <ActionBox class="my-0" v-if="isSignedIn && prod.stock > 0" :prod="prod"></ActionBox>
    <span v-if="prod.stock === 0">Out of Stock</span>
  </b-card> <!-- card // -->
</template>

<script>
import axios from '../../apis/server'
import Swal from 'sweetalert2'
import ActionBox from '../components/ActionBox'

export default {
  name: 'ProductCard',
  props: ['prod'],
  components: {
    ActionBox
  },
  data () {
    return {
    }
  },
  methods: {
  },
  computed: {
    isSignedIn () {
      return this.$store.state.isSignedIn
    }
  }
}
</script>

<style>
.prod-box {
  min-width: 120px;
  max-width: 250px;
  min-height: 400px;
  max-height: 500px
}

.prod-img {
	max-width: 100px
}

.img-wrap {
  min-height: 100px
}

.item-name {
	color: rgba(0, 0, 0, 0.7);
	display: -webkit-box;
	max-height: 38px;
	font-size: 14px;
	font-weight: 600;
	overflow-wrap: break-word;
}
</style>