<template>
  <div>
    <b-navbar class="navbar fixed-top" toggleable="lg" type="light" variant="white">
      <div class="nav-side">
        <b-navbar-brand to="/">
          <img src="../../public/logam-mulia.jpg">
        </b-navbar-brand>

        <b-navbar-nav>
          <b-nav-item-dropdown text="Gold Bars" right>
            <b-dropdown-item to="/purchase/gold">Buy Gold</b-dropdown-item>
            <b-dropdown-item to="/purchase/batik-series">Batik Series Indonesia</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>

        <b-navbar-nav>
          <b-nav-item-dropdown text="Services" right>
            <b-dropdown-item to="/services/custom-product">Custom Product</b-dropdown-item>
            <b-dropdown-item to="/services/refining">Refining Service</b-dropdown-item>
            <b-dropdown-item to="/services/analysis">Analysis Service</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>

        <b-navbar-nav>
          <b-nav-item to="/about">About Us</b-nav-item>
        </b-navbar-nav>
      </div>
      <div class="nav-side">
        <b-navbar-nav>
          <b-nav-item href="#"><i class="fas fa-shopping-bag" right></i></b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav>
          <b-nav-item to="/login">Masuk/Login</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav>
          <b-nav-item href="#" right>
            <img src="../../public/antam.png">
          </b-nav-item>
        </b-navbar-nav>
      </div>
    </b-navbar>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.navbar {
 box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
 display: flex !important;
 flex-direction: row !important;
 justify-content:space-between;
}

.nav-side {
  display:flex;
  align-items:center;
}

img {
  height: 50px;
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
</style>
