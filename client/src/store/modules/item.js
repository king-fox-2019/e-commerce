import axios from '../../../apis/server'

const namespaced = true

const state = {
   items: []
}

const mutations = {
   FILL_ITEMS(state, items) {
      state.items = items
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
   }
}

const getters = {
   getItems: (state) => {
      return state.items
   }
}

export default {
   namespaced,
   state,
   mutations,
   actions,
   getters
}