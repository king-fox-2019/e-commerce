<template>
    <div class="registerPage" style="">
        <!-- <h1 style="border: 2px solid red">filename : registerpage.vue</h1> -->
        <FormRegister/>
    </div>


</template>


<script>

import FormRegister from '../components/FormRegister'

export default {
    
    name: 'registerPage',
    components: { FormRegister },




}
</script>

<style>

.registerPage
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