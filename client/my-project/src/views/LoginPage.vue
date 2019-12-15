<template>
    <div class="loginPage" style="">
    <!-- <h1>filename: LoginPage.vue</h1> -->
    <FormLogin/>
    

    </div>

</template>

<script>
import FormLogin from '@/components/FormLogin'

export default {
    name: 'loginPage',
    components: {
        FormLogin
    }
}
</script>

<style>
.loginPage
{
  border: solid 1px black;
  background-image: url('../assets/bg/bg (1).jpg');
  background-size: 100%;
  /* background */
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
  /* background-size: 100% auto ; */
  height: 100vh
  
}
</style>