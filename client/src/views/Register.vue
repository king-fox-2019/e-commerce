<template>
<div class="container">
  <div class="row">
    <div class="col-lg-6">
      <div class="box">
        <h1>New account</h1>
        <p class="lead">Not our registered customer yet?</p>
        <p>With registration with us new world of fashion, fantastic discounts and much more opens to you! The whole process will not take you more than a minute!</p>
        <p class="text-muted">
          If you have any questions, please feel free to
          <a href="#">contact us</a>, our customer service center is working for you 24/7.
        </p>
        <hr />
        <form action="" method="post">
          <div class="form-group">
            <label for="name">Name</label>
            <input id="name" type="text" class="form-control" />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input id="email" type="text" class="form-control" />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input id="password" type="password" class="form-control" />
          </div>
          <div class="form-group">
            <label for="password">Confirm Password</label>
            <input id="password" type="password" class="form-control" />
          </div>
          <div class="form-group justify-content-center d-flex">
            <button type="submit" class="btn btn-primary">Register</button>
          </div>
        </form>
      </div>
    </div>
    <div class="col-lg-6">
      <div class="box">
        <h1>Login</h1>
        <p class="lead">Already our customer?</p>
        <hr />
        <form action="" @submit.prevent="setLogin" method="post">
          <div class="form-group">
            <label for="email">Email</label>
            <input id="email" type="text" class="form-control" />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input id="password" type="password" class="form-control" />
          </div>
          <div class="form-group justify-content-center d-flex">
            <button type="submit" class="btn btn-primary">Log In</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'Register',
  methods: {
    setLogin: function () {
      this.$emit('set-login')
    }
  }
}
</script>

<style scoped>
.container {
  margin-top: 80px
}
</style>
