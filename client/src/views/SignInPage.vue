<template>
  <div class="bg-signin-page">
    <SignInForm class="form-user"></SignInForm>
  </div>
</template>

<script>
import SignInForm from '../components/SignInForm'

export default {
  components: {
    SignInForm
  }
}
</script>

<style>
.form-user {
  padding-top: 120px;
}
.bg-signin-page {
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
  background-image: url("https://images.unsplash.com/photo-1473283297248-4a5c0b5fad7f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80");
}
</style>
