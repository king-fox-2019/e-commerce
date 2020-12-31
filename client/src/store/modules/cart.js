import axios from 'axios'

const namespaced = true

const state = {
    cart:[]
}

const mutations = {
    FILL_CART(state,payload){
        state.cart.push(payload)
    },
    SET_INITIAL_CART(state,payload){
        state.cart=payload
    },
    EMPTY_CART(state){
        state.cart=[]
    },
    DELETE_ONE_PRODUCT(state,payload){
        let newCart = state.cart.filter(product=>{
            return product._id !== payload.productId
        })
        state.cart = newCart
    }
}

const actions = {
    addToCart({commit},payload){
        let product = payload
        axios({
            method:'put',
            url:'http://35.226.212.72/user/cart',
            data:{
                cart : product
            },
            headers:{access_token:localStorage.getItem('access_token')}
        })
        .then(()=>{
            commit('FILL_CART',product)
        })
        .catch(err=>console.log(err))
    },
    getCartItems({commit}){
        axios({
            method:'get',
            url:'http://35.226.212.72/user/cart',
            headers:{access_token:localStorage.getItem('access_token')}
        })
        .then(products=>{
            commit('SET_INITIAL_CART',products.data)
        })
        .catch(err=>console.log(err))
    },
    emptyCartItems({commit}){
        axios({
            method:'put',
            url:'http://35.226.212.72/user/cart?empty=1',
            data:{
                cart:[]
            },
            headers:{access_token:localStorage.getItem('access_token')}
        })
        .then(()=>{
            commit('EMPTY_CART')
        })
        .catch(err=>console.log(err))
    },
    deleteOneItem({commit},payload){
        let product = payload.productId
        axios({
            method:'put',
            url:'http://35.226.212.72/user/cart?productId='+product,
            headers:{access_token:localStorage.getItem('access_token')}
        })
        .then(()=>{
            commit('DELETE_ONE_PRODUCT',{productId:product})
        })
    },
    checkoutCart({commit,state}){
        console.log('masuk coy')
        axios({
            method:'put',
            url:'http://35.226.212.72/user/checkout',
            data:{item:state.cart},
            headers:{access_token:localStorage.getItem('access_token')}
        })
        .then(()=>commit('EMPTY_CART'))
        .catch(err=>console.log(err))
    }
}

const getters = {
    cartItems: state => {
        return state.cart
    }
}

export default {
    namespaced,
    state,
    mutations,
    actions,
    getters
}