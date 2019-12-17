import axios from '../../../apis/server'

const namespaced = true

const state = {
   items: [],
   currentItem: {}
}

const mutations = {
   FILL_ITEMS(state, items) {
      state.items = items
   },
   
   FILL_CURRENT_ITEM(state, item) {
      state.currentItem = item
   }
}

const actions = {
   fetchItems ({commit}) {
      axios({
         url: '/item',
         method: 'get'
      })
      .then(({data}) => {
         commit('FILL_ITEMS', data.items)
      })
      .catch(error => console.log(error))
   },

   fetchCurrentItem({commit}, itemId) {
      axios({
         url: `/item/${itemId}`,
         method: 'get'
      })
      .then(({data}) => {
         console.log('fetch berhasil')
         commit('FILL_CURRENT_ITEM', data.item)
      })
      .catch(error => console.log(error))
   }
}

const getters = {
   getItems: (state) => {
      return state.items
   },
   // this doesn't work because cannot get $router
   getOneItem: (state, router) => {
      return state.items.filter((item) => {
         return item._id == router.params.itemId
      })
   },
   getCurrentItem: (state) => state.currentItem
}

export default {
   namespaced,
   state,
   mutations,
   actions,
   getters
}