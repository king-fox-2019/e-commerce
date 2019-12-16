import axios from 'axios'

const namespaced = true

const state = {
    products:[]
}

const mutations = {
    SET_PRODUCT(state,payload){
        state.products = payload
    }
}

const actions = {
    getProducts({commit}){
        axios({
            method:'get',
            url:'http://35.226.212.72/product'
        })
        .then(products=>{
            commit('SET_PRODUCT',products.data)
        })
        .catch(err=>console.log(err))
    }
}

const getters = {
    listProducts : state => {
        return state.products
    }
}

export default ({
    namespaced,
    state,
    mutations,
    actions,
    getters
})