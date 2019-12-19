<template>
  <div id="home">
    <div
      class="d-flex flex-column align-items-center text-center"
      id="jumbotron"
    >
      <h1>LaZaloPedia</h1>
      <h5>Bullshit e-commerce with lots of scam goodies free just for you</h5>

      <b-form @submit.prevent="searchItems" novalidate>
        <div
          class="d-block d-md-flex"
          label="Start search something you interest at!"
        >
          <b-form-input
            size="lg"
            class="mr-3"
            list="search-list"
            placeholder="Start searching our stuffs"
            debounce="500"
            v-model="searchQuery"
            autocomplete="off"
            trim
            autofocus
          ></b-form-input>
          <b-form-datalist
            id="search-list"
            :options="searchOptions"
          ></b-form-datalist>
          <b-button
            class="mt-3 mt-md-0"
            size="lg"
            type="submit"
            variant="accent"
            >Search</b-button
          >
        </div>
      </b-form>

      <div class="mt-auto">
        <h6>Or just scroll our stuffs below</h6>
      </div>
    </div>

    <item-list :items="itemList"></item-list>
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
      itemList: []
    }
  },
  computed: {
    items() {
      return this.$store.state.items
    },
    searchOptions() {
      return this.items.map(item => item.name)
    }
  },
  methods: {
    searchItems() {
      const pattern = this.searchQuery
        .split('')
        .map(x => {
          return `(?=.*${x})`
        })
        .join('')
      const search = new RegExp(`${pattern}`, 'gi')
      this.itemList = this.items.filter(item => search.test(item.name))
    }
  },
  created() {
    this.$store.dispatch('FETCH_USER_DATA').then(() => this.searchItems())
  }
}
</script>

<style lang="scss" scoped>
#home {
  height: 100%;

  #jumbotron {
    height: 682px;
    background-color: var(--primary);
    color: var(--white);
    margin: 0;
    padding: 0;

    h1 {
      font-size: 3.5rem;
      margin-top: 8rem;
    }

    form {
      margin-top: 6rem;
      width: 80%;
    }
  }
}

$mid: var(--breakpoint-md);

@media (min-width: 768px) {
  #home {
    #jumbotron {
      height: 600px;

      form {
        width: 50%;
      }
    }
  }
}

@media (min-width: 576px) {
  #home {
    #jumbotron {
      h1 {
        font-size: 5rem;
      }
    }
  }
}
</style>
