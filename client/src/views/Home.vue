<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <MainCarousel class="corau"/>
    <CardHolder class="cardHolder"/>
  </div>
</template>

<script>
// @ is an alias to /src
import MainCarousel from '../components/MainCarousel';
import CardHolder from '../components/CardHolder';

export default {
  name: 'home',
  components: {
    MainCarousel,
    CardHolder
  }
}
</script>

<style scoped>
.home{
  display: flex;
  width: 100vw;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.corau{
  width: 100%;
  margin-top: 0;
  max-width: 100%;
  max-height: 110%;
}
.cardHolder{
  width: 90vw;
  display: flex;
  justify-content: center;
  flex-flow: row wrap;
}
</style>