import axios from 'axios'

const namespaced = true

const state = {
    transactions: [],
    userTransactions: []
}

const mutations = {
    SET_TRANSACTIONS(state,payload){
        state.transactions = payload
    },
    SET_USER_TRANSACTIONS(state,payload){
        state.userTransactions = payload
    }
}

const actions = {
    getAllTransactions({commit}){
        axios({
            action:"get",
            url:'http://35.226.212.72/transaction'
        })
        .then(result=>{
            commit('SET_TRANSACTIONS',result.data)
        })
        .catch(err=>console.log(err))
    },
    getUserTransactions({commit}){
        axios({
            action:"get",
            url:'http://35.226.212.72/transaction?user=1',
            headers:{access_token:localStorage.getItem('access_token')}
        })
        .then(result=>{
            commit('SET_USER_TRANSACTIONS',result.data)
        })
        .catch(err=>console.log(err))
    }
}

const getters = {
    listTransaction: state => {
        return state.transactions
    },
    listUserTransaction: state => {
        return state.userTransactions
    }
}

export default {
    namespaced,
    state,
    mutations,
    actions,
    getters
}