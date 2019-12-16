<template>
  <div>
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.1.1/css/all.css" integrity="sha384-O8whS3fhG2OnA5Kas0Y9l3cfpmYjapjI0E4theH4iuMD+pLhbf6JI0jIMfYcK3yZ" crossorigin="anonymous">
    <nav class="navbar navbar-expand-lg navbar-light pl-0 pr-0 pt-0 pb-0 register-background" style="border-bottom: 1px solid #E5E5E5">
      <button type="button" class="btn p-2 pl-4 pr-4 mx-auto">
          <img src="../assets/Navbar-Mark.png" class="py-2" style="height: 70px;" alt="sportstation">
      </button>
    </nav>
  </div>
</template>

<script>
export default {
  data () {
    return {}
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
    font-size: 25px;
}
.formSearch:focus{
    box-shadow: none;
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
