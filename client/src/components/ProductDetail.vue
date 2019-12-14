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
        <img src="https://images.unsplash.com/photo-1574327694472-d172fb4d5865?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1532&q=80" class="img-fluid" alt="">
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
          <h1 class="text-center">White Blouse Armani</h1>
          <p class="goToDescription">
            <a
              href="#details"
              class="scroll-to"
            >Scroll to product details, material &amp; care and sizing</a>
          </p>
          <p class="price">$124.00</p>
          <p class="text-center buttons">
            <a href="basket.html" class="btn btn-primary">
              <i class="fa fa-shopping-cart"></i> Add to cart
            </a>
          </p>
        </div>
        <div class="box" id="details">
          <p>product detail bla bla</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailProduct'
}
</script>

<style scoped>
.productDetail {
  padding: 2rem
}
</style>
