<template>
	<b-container class="my-4 mx-auto ">
		<b-row class="mx-auto">
			<b-col
				v-for="product in products"
				:key="product._id"
				class="col-prod">
				<ProductCard :prod="product"></ProductCard>
			</b-col>
		</b-row>
	</b-container>
</template>

<script>
import axios from '../../apis/server'
import ProductCard from '../components/ProductCard'
import { mapState } from 'vuex'

export default {
	name: 'Products',
	components: {
		ProductCard
	},
	data () {
		return {
		}
	}, 
	created () {
		this.$store.dispatch('fetchProducts')
	},
	computed: {
		fetchProducts () {
			this.$store.dispatch('fetchProducts')
		},
		...mapState(['products'])
	}
}
</script>

<style scoped>
.col-prod {
	min-width: 250px;
	max-width: 250px
}
</style>
