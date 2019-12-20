<template>
  <div class="button-shop">
    <h1 style="font-size:50px;color:white">To become a seller, enter the password below</h1>
    <div
      style="margin:15px;text-align:center;  color: white;"
      class="massive ui transparent left icon input"
    >
      <input v-model="password" type="password" placeholder="Password" style="color: white;" />
      <i class="eye slash icon"></i>
    </div>
    <div style="margin:15px;text-align:center">
      <button
        @click.prevent="becomeASeller"
        class="huge ui inverted button btn-shop"
        style="border-radius: 0px;"
      >Become A Seller</button>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
  data() {
    return {
      password: ""
    };
  },
  methods: {
    becomeASeller() {
      const payload = {
        password: this.password
      };
      this.$store
        .dispatch("changeStatusUser", payload)
        .then(data => {
          Swal.fire("Success!", data.message, "success");
          this.$router.push("/");
        })
        .catch(err => {
          const message = err.response.data.message;
          Swal.fire("Oops...", message, "error");
        });
    }
  }
};
</script>

<style>
.button-shop {
  height: 100%;
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
}
.btn-shop {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
