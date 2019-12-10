<template>
  <div id="home">
    <div
      class="d-flex flex-column align-items-center text-center"
      id="jumbotron"
    >
      <h1>LaZaloPedia</h1>
      <h5>Bullshit e-commerce with lots of scam goodies free just for you</h5>

      <b-form class="w-50" @submit="searchItems" novalidate>
        <div class="d-flex" label="Start search something you interest at!">
          <b-form-input
            size="lg"
            class="mr-3"
            list="search-list"
            placeholder="Start searching our stuffs"
            debounce="500"
            v-model="searchQuery"
            trim
            autofocus
          ></b-form-input>
          <b-form-datalist
            id="search-list"
            :options="searchOptions"
          ></b-form-datalist>
          <b-button size="lg" type="submit" variant="accent">Search</b-button>
        </div>
      </b-form>

      <div class="mt-auto">
        <h6>Scroll to see our products</h6>
      </div>
    </div>

    <item-list></item-list>
  </div>
</template>

<script>
import ItemList from '@/components/ItemList.vue'

export default {
  name: 'home',
  components: {
    'item-list': ItemList
  },
  data() {
    return {
      searchQuery: '',
      searchOptions: []
    }
  },
  methods: {
    searchItems() {}
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/main.scss';

h1 {
  font-size: 5rem;
  margin-top: 4rem;
}

form {
  margin-top: 5rem;
}

#home {
  height: 80vh;
}

#jumbotron {
  height: 100%;
  background-color: $primary;
  color: $white;
}
</style>
