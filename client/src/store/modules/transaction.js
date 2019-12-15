import axios from '../../../api/server'

const state = {
}

const mutations = {
}

const actions = {
  createTransaction ({ dispatch }, payload) {
    return axios({
      url: '/transaction',
      method: 'POST',
      data: payload,
      headers: {
        access_token: localStorage.getItem('token')
      }
    })
  }
}

export default {
  state,
  mutations,
  actions
}
