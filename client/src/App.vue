<template>
  <div id="app">
    <Navbar class="fixed-top" />
    <router-view/>
    <FooterPage/>
  </div>
</template>

<script>

import Navbar from '@/components/Navbar.vue'
import FooterPage from '@/components/FooterPage.vue'
export default {
  components :{
    Navbar,
    FooterPage
  },
  created(){
    if(localStorage.getItem('token')){
      this.$store.commit('CHANGE_LOGIN',true)
    }else{
      this.$store.commit('CHANGE_LOGIN',false)
    }
  }
}
</script>

<style>

.fixed-top{
  box-shadow: 10px 10px 28px -9px rgba(0,0,0,0.23);
  background-color:white;
}

.icons-user{
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
}

.right-bar{
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 270px;
}

.avatar {
  vertical-align: middle;
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.vl {
  border-left: 1px solid #E6E6E6;
  height: 40px;
  margin-left:20px;
  margin-right:20px;
}



</style>
