<template>
  <mdb-container>
		<mdb-row class="product-cards-container">
			<mdb-card-group v-for="(product, i) in productGroup" :key="i" deck>
				<ProductCard 
          :product="product" 
          />
			</mdb-card-group>
		</mdb-row>
	</mdb-container>
</template>

<script>
import { mdbContainer, mdbRow, mdbCardGroup } from 'mdbvue';
import ProductCard from './ProductCard'

export default {
  name: 'product-card-group',
  props: ['productGroup'],
  components: {
      ProductCard,
			mdbContainer,
			mdbRow,
			mdbCardGroup
		}
};
</script>

<style scoped>
.product-cards-container {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>