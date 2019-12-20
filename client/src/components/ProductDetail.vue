<template>
  <div class="productDetail">
    <div id="productMain" class="row">
      <div class="col-md-6">
        <!-- <div data-slider-id="1" class="owl-carousel shop-detail-carousel owl-loaded owl-drag">
          <div class="owl-stage-outer">
            <div
              class="owl-stage"
              style="transform: translate3d(-1590px, 0px, 0px); transition: all 0.25s ease 0s; width: 2783px;"
            >
              <div class="owl-item cloned" style="width: 397.5px;">
                <div class="item">
                  <img src="img/detailbig2.jpg" alt class="img-fluid" />
                </div>
              </div>
              <div class="owl-item cloned" style="width: 397.5px;">
                <div class="item">
                  <img src="img/detailbig3.jpg" alt class="img-fluid" />
                </div>
              </div>
              <div class="owl-item" style="width: 397.5px;">
                <div class="item">
                  <img src="img/detailbig1.jpg" alt class="img-fluid" />
                </div>
              </div>
              <div class="owl-item" style="width: 397.5px;">
                <div class="item">
                  <img src="img/detailbig2.jpg" alt class="img-fluid" />
                </div>
              </div>
              <div class="owl-item active" style="width: 397.5px;">
                <div class="item">
                  <img src="img/detailbig3.jpg" alt class="img-fluid" />
                </div>
              </div>
              <div class="owl-item cloned" style="width: 397.5px;">
                <div class="item">
                  <img src="img/detailbig1.jpg" alt class="img-fluid" />
                </div>
              </div>
              <div class="owl-item cloned" style="width: 397.5px;">
                <div class="item">
                  <img src="img/detailbig2.jpg" alt class="img-fluid" />
                </div>
              </div>
            </div>
          </div>
          <div class="owl-nav disabled">
            <button type="button" role="presentation" class="owl-prev">
              <span aria-label="Previous">‹</span>
            </button>
            <button type="button" role="presentation" class="owl-next">
              <span aria-label="Next">›</span>
            </button>
          </div>
          <div class="owl-dots disabled"></div>
        </div> -->
        <img :src="detailProduct.image" class="img-fluid" alt="">
        <div class="ribbon sale">
          <div class="theribbon">SALE</div>
          <div class="ribbon-background"></div>
        </div>
        <!-- /.ribbon-->
        <div class="ribbon new">
          <div class="theribbon">NEW</div>
          <div class="ribbon-background"></div>
        </div>
        <!-- /.ribbon-->
      </div>
      <div class="col-md-6">
        <div class="box">
          <h1 class="text-center">{{detailProduct.name}}</h1>
          <p class="goToDescription">
            <a
              href="#details"
              class="scroll-to"
            >Scroll to product details, material &amp; care and sizing</a>
          </p>
          <p class="price">${{detailProduct.price}}.00</p>
          <form action="" method="post" @submit.prevent="addToCart">
            <div class="form-group">
              <label for="qty">Quantity: </label>
              <input required id="qty" type="number" class="form-control" v-model="quantity"/>
            </div>
            <div class="form-group justify-content-center d-flex">
              <button type="submit" class="btn btn-primary"><i class="fa fa-shopping-cart"></i> Add to cart</button>
            </div>
          </form>
        </div>
        <div class="box" id="details">
          <p>avaliable stock: {{detailProduct.stock}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '../config/api'
export default {
  name: 'DetailProduct',
  data: function () {
    return {
      quantity: 1
    }
  },
  computed: {
    detailProduct () {
      return this.$store.state.products.filter((product) => {
        return product._id === this.$route.params.id
      })[0]
    }
  },
  methods: {
    addToCart () {
      axios({
        method: 'PATCH',
        url: `/user/cart`,
        data: {
          quantity: this.quantity,
          ProductId: this.$route.params.id
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          this.$store.dispatch('fetchUser')
        })
        .catch(() => {
          this.$swal.fire(
            'Out of Stock',
            'This item is on popular demand',
            'error'
          )
        })
    }
  }
}
</script>

<style scoped>
.productDetail {
  padding: 2rem
}
</style>
