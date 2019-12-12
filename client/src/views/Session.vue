<template>
  <div class="container">
    <sign-up v-if="$route.query.on == 'signup'"></sign-up>
    <sign-in v-if="$route.query.on == 'signin'"></sign-in>
  </div>
</template>

<script>
import SignUp from '@/components/SignUp'
import SignIn from '@/components/SignIn'

export default {
  components: {
    'sign-up': SignUp,
    'sign-in': SignIn
  },
  created() {
    this.$store.dispatch('FETCH_USER_DATA').then(() => {
      if (this.$store.state.user.onSession) this.$router.replace('/')
    })
  }
}
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
}
</style>
