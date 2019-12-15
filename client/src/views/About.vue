<template>
  <div class="container">
    <div class="row">
      <div v-if="setUser">
        <h1>YOU HAVE BEEN LOGIN</h1>
        <b-button pill variant="info" @click.prevent="out">SignOut <i class="fa fa-sign-out"></i></b-button>
      </div>
      <login v-if="!setUser"/>
      <register v-if="!setUser"/>
    </div>
  </div>
</template>

<script>
import login from '../components/login'
import register from '../components/register'
import {mapMutations} from 'vuex'

export default {
  name: 'account',
  data:function(){
    return {
    
    }
  },
  components:{
    login,
    register
  },
  computed:{
    setUser(){
      return this.$store.state.user
    }
  },
  methods:{
      ...mapMutations({
        logOut: 'cart/getNull'
      }),
    out(){
       localStorage.clear()
       this.logOut()
       this.$store.commit('setUser',null)
       
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
