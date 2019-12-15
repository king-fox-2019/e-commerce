<template>
  <div id="app">
    <div>
      <b-navbar toggleable="lg" variant="warning">
        <b-navbar-brand><router-link to="/">E - GOLD</router-link></b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
              <b-nav-item ><router-link to="/cart">| CART <i class="fa fa-cart-arrow-down"></i></router-link> |</b-nav-item>
              <b-nav-item ><router-link to="/about">ACCOUNT <i class="fa fa-user-circle"> |</i></router-link></b-nav-item>
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
              <b-nav-form>
                <b-form-input size="sm" class="mr-sm-2" placeholder="gk bisa dipake ya !!"></b-form-input>
                <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
              </b-nav-form>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <router-view/>
  </div>
</template>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
a, a:hover{
  text-decoration: none !important;
}
</style>
