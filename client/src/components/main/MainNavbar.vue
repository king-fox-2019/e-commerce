<template>
  <div class="wrapper">
    <div id="navigation">
      <div class="navigation-example" :style="bgImage">
        <div class="md-layout">
          <div class="md-layout-item">
            <md-toolbar class="md-transparent">
              <div class="md-toolbar-row">
                <div class="md-toolbar-section-start">
                  <router-link to="/">
                    <h3 class="md-title">Analogues</h3>
                  </router-link>
                </div>
                <div class="md-toolbar-section-end">
                  <md-button
                    class="md-just-icon md-simple md-white md-toolbar-toggle"
                  >
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                  </md-button>

                  <div class="md-collapse">
                    <md-list>
                      <md-list-item v-if="isLoggedIn" @click.prevent="logOut">
                        <p>LOG OUT</p>
                      </md-list-item>

                      <router-link to="profile" v-if="isLoggedIn">
                        <md-list-item href="javascript:void(0)">
                          <p>PROFILE</p>
                        </md-list-item>
                      </router-link>
                    
                      <router-link to="login" v-if="!isLoggedIn">
                        <md-list-item href="javascript:void(0)">
                          <p>LOGIN</p>
                        </md-list-item>
                      </router-link>
                    
                    <router-link to="products">
                      <md-list-item href="javascript:void(0)">
                        <p>SHOP</p>
                      </md-list-item>
                    </router-link>

                    <router-link to="cart">
                      <md-list-item href="javascript:void(0)">
                        <p>CART</p>
                      </md-list-item>
                    </router-link>
                    </md-list>
                  </div>
                </div>
              </div>
            </md-toolbar>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState([
      'bgUrl',
      'isLoggedIn'
    ]),
    bgImage() {
      return {
        backgroundImage: `url(${this.bgUrl})`
      };
    }
  },
  methods: {
    logOut() {
      localStorage.removeItem('token')
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.navbar {
  background-color: white;
  border-bottom: 2px solid black;
}
</style>