<template>
  <div v-if="not_register_nav">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.1.1/css/all.css" integrity="sha384-O8whS3fhG2OnA5Kas0Y9l3cfpmYjapjI0E4theH4iuMD+pLhbf6JI0jIMfYcK3yZ" crossorigin="anonymous">
    <nav class="navbar navbar-expand-lg navbar-light pl-0 pr-0 pt-0 pb-0" style="border-bottom: 1px solid #E5E5E5">
      <button type="button" class="btn navbarAnchor p-2 pl-4 pr-4">
          <img src="../assets/Navbar-Mark.png" class="py-2" style="height: 70px;" alt="sportstation">
      </button>
      <!-- <button type="button" class="btn navbarAnchor p-2 pl-4 pr-4">
          <img src="../assets/nike.png" class="py-2 ml-5" style="height: 70px;" alt="sportstation">
      </button> -->
      <div v-if="on" class="ml-auto">
          <div class="input-group col-9 ml-auto">
            <div class="input-group-prepend">
              <span class="input-group-text formSearch" id="inputGroupPrepend2">
                  <i class="fas fa-search"></i>
              </span>
            </div>
            <input type="text" v-model="search" class="form-control formSearch" id="validationDefaultUsername" placeholder="Product.." aria-describedby="inputGroupPrepend2" required>
          {{ search }}
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data () {
    return {
      'not_register_nav': true,
      search: '',
      on: false
    }
  },
  // computed: {
    // lisitem(){
    //   return this.articles.filter(article => {
    //       return article['tag'].some(tag=>{
    //           if (tag.toLowerCase().includes(this.searchTag.toLowerCase())) {
    //               return article
    //           }
    //       })
    //   })
    // }
  // },
  watch: {
    $route (to, from) {
      if (to.path === '/register') {
        this.not_register_nav = false
      } else if (to.path === '/admin') {
        this.not_register_nav = false
      } else {
        this.not_register_nav = true
      }
    }
  }
}
</script>

<style scoped>
*{
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
/* background-color: #FFFFFF; border:none */
.register-background{
  background: url('../assets/adidasBubble.gif');
}
.formSearch{
    background-color: #ffffff;
    border: none;
    font-size: 20px;
    transition: 0.5s;
}
.formSearch:focus{
    font-size: 25px;
    box-shadow: none;
    color: orangered;
}

.navbarAnchor{
    color: rgb(134, 134, 134);
    background-color: #ffffff;
    border: none;
    font-size: 15px;
}
.navbarAnchor:hover{
    color: rgb(31, 31, 31);
}
.navbarAnchor:focus{
  box-shadow: none;
  border: none;
}

.navbarLogo{
    background-color: #ffffff;
    border: none;
    border-right: 1px solid #E5E5E5;
}
.navbarLogo:hover{
    background-color: #919090;
}
.navbarkanan{
    background-color: #ffffff;
    border: none;
    color: rgb(134, 134, 134);
}
.navbarkanan:hover{
    color: rgb(31, 31, 31);
}

.navbarkanantext{
    background-color: #ffffff;
    border: none;
    color: rgb(134, 134, 134);
}

.navbarkanantext:hover{
    color: black;
    border-bottom: 1px solid black;
}

</style>
