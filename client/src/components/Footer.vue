<template>
  <div>
    <div class="footer">
      <div class="ui inverted vertical footer segment">
        <div class="ui container">
          <div
            class="ui stackable inverted divided equal height stackable grid"
            style="text-align:left"
          >
            <div class="three wide column">
              <h4 class="ui inverted header">About SShop</h4>
              <div class="ui inverted link list">
                <a class="item">Offline Store</a>
                <a class="item">Contact Us</a>
                <a class="item">Collaboration</a>
                <a class="item">Complain</a>
              </div>
            </div>
            <div class="three wide column">
              <h4 class="ui inverted header">Services</h4>
              <div class="ui inverted link list">
                <a class="item">Pre-Order</a>
                <a class="item">FAQ</a>
                <a class="item">How To Get Special Price</a>
                <a class="item" @click.prevent="movePage('seller-form')">Become a seller</a>
              </div>
            </div>
            <div class="seven wide column">
              <h4 class="ui inverted header">SShop</h4>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Non
                placeat delectus ex cumque, numquam quibusdam ad aut quisquam?
                Ipsum quam ad a eligendi, amet ducimus voluptate neque quidem
                maxime accusamus?
              </p>
            </div>
            <div class="three wide column">
              <img width="120px" src="../assets/SShop.png" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    movePage(page) {
      if (page === "seller-form") {
        this.$router.push("/becomeaseller");
      }
    }
  }
};
</script>

<style>
.footer {
  background-color: rgb(9, 9, 9);
  height: 200px;
}

.footer.segment {
  padding: 3em 0em;
}
</style>
