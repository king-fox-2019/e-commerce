<template>
  <div class="footer">
    <div class="row foot">
      <div class="col">
        <div class="row">
          <div class="col">
            <h5>Products and Services</h5>
            <a href="">Home</a><br>
            <a href="">Custome Product</a><br>
            <a href="">Service</a>
          </div>
          <div class="col mt-4">
            <a href="">Buy Gold</a><br>
            <a href="">Gold Series Indonesia</a>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="row">
          <div class="col">
            <h5>Information</h5>
            <a href="">My Account</a><br>
            <a href="">Logam Mulia Profile</a><br>
          </div>
          <div class="col">
            <h5>Support</h5>
            <a href="">Contact Us</a><br>
          </div>
        </div>
      </div>
      <div class="col">
        <div>
          <h5>Accreditation</h5>
          <img src="../../public/accreditation-1.png">
          <img src="../../public/accreditation-2.png">
          <img src="../../public/accreditation-3.png">
        </div>
        <div class="mt-4">
          <h5>Security</h5>
          <img src="../../public/security.png">
        </div>
        <div class="mt-4">
          <img src="../../public/logam-mulia.png">
          <img src="../../public/antam-2.png">
        </div>
      </div>
    </div>
    <div class="copyright mt-4">
      © Brahmantya Sukma, 2019 All Rights Reserved
    </div>
  </div>
</template>

<script>
export default {

};
</script>

<style scoped>
.footer {
  margin-top: 50px;
  background-color: #23427e;
  color: white
}

.foot {
  border-top: 10px solid  #cb9b2d !important;
  text-align: left;
  padding-top: 30px;
  padding-left: 20px;
  /* border-color: #00ccaa !important; */
}

h5 {
  font-size: 14px;
  font-weight: bold;
  color: #cb9b2d
}

a {
  color: white;
  font-size: 12px;
}

.copyright {
  color: white;
  font-size: 12px;
  padding-bottom: 20px
}

img {
  height: 30px;
  margin-right: 20px
}
</style>
