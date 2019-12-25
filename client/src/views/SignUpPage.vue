<template>
  <div class="bg-signup-page">
    <SignUpForm class="form-user"></SignUpForm>
  </div>
</template>

<script>
import SignUpForm from '../components/SignUpForm'

export default {
  components: {
    SignUpForm
  }
}
</script>

<style>
.form-user {
  padding-top: 120px;
}
.bg-signup-page {
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
  background-image: url("https://images.unsplash.com/photo-1572296232042-ef1181b39a1c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80");
}
</style>
