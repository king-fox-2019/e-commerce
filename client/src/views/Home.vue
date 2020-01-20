<template>
<div>
  <b-container fluid id="main" class="d-flex align-items-center">
    <b-card id="quotes-box" class="text-center">
        <blockquote class="quotes mx-2 rounded-sm text-center">Whosoever is delighted in solitude is either a wild beast or a god  <cite class="author"> - Aristotle</cite></blockquote>
        <span>Get yourself ready for solitariness</span>
        <br>
        <b-button variant="outline-dark" to="/products" class="my-2">Go to Store</b-button>
    </b-card>
  </b-container>
</div>
</template>

<script>

export default {
  name: 'Home',
  components: {
  }
}
</script>

<style scoped>
#main {
    position: fixed;
    background: url('https://i.imgur.com/vytgCGx.jpg') no-repeat;
    background-position: center -200px;
    background-size: cover;
    height: 100%
}

#quotes-box {
    position: absolute;
    top: 30%;
    left: 20%;
    width: 30rem; 
    height: 15rem;
    opacity: 60%;
    transition: 0.8s;
}

#quotes-box:hover {
  cursor: pointer;
  transform: scale(1.1);
  transition: 0.8s;
}

.quotes {
    font-size: 1.5rem
}
</style>
