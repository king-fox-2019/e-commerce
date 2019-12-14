<template>
  <div>
    <Navbar />
  <div class="main">
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="4000"
      controls
      indicators
      background="#ababab"
      img-width="1024"
      img-height="480"
      style="text-shadow: 1px 1px 2px #333;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <b-carousel-slide>
        <template v-slot:img>
          <img
            class="d-block img-fluid w-100"
            width="1024"
            height="520"
            src="../../public/header-1.jpg"
            alt="image slot"
          >
        </template>
      </b-carousel-slide>
      <b-carousel-slide>
        <template v-slot:img>
          <img
            class="d-block img-fluid w-100"
            width="1024"
            height="520"
            src="../../public/header-2.jpg"
            alt="image slot"
          >
        </template>
      </b-carousel-slide>
      <b-carousel-slide>
        <template v-slot:img>
          <img
            class="d-block img-fluid w-100"
            width="1024"
            height="520"
            src="../../public/header-3.jpg"
            alt="image slot"
          >
        </template>
      </b-carousel-slide>
      <b-carousel-slide>
        <template v-slot:img>
          <img
            class="d-block img-fluid w-100"
            width="1024"
            height="520"
            src="../../public/header-4.jpg"
            alt="image slot"
          >
        </template>
      </b-carousel-slide>

      <!-- Slide with blank fluid image to maintain slide aspect ratio -->
    </b-carousel>
    <div class="row info border">
      <div class="col buy">
        <div class="col p-2">
          <div>
            <a class="btn btn-primary rounded-pill" href="#" role="button">BUY GOLD ></a>
          </div>
          <div class="mt-2">
            <a class="btn btn-primary rounded-pill" href="#" role="button">BUY SERIES BATIK ></a>
          </div>
          <div class="desc">
            <i class="far fa-clock"></i> last update: 10 Dec 2019 08:16:07
          </div>
        </div>
      </div>
      <div class="col gold">
        <div class="mt-4 title">Gold</div>
        <div class="price">Price/gram IDR743,000.00</div>
        <div class="lat-price">Latest Price: IDR744,000.00</div>
      </div>
      <div class="col silver">
        <div class="mt-4 title">Silver</div>
        <div class="price">Price/gram IDR8,000.00</div>
        <div class="lat-price">Latest Price: IDR8,000.00</div>
      </div>
      <div class="col buy">
        <div class="col buy">
          <div class="desc-2 p-2">
            Your Location <i class="fas fa-location-arrow"></i> Butik Emas LM - Pulo Gadung, Jakarta
          </div>
      </div>
      </div>
    </div>
  </div>
  <Footer />
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue';
import Footer from '../components/Footer.vue';

export default {
  name: 'home',
  components: {
    Navbar, Footer,
  },
  data() {
    return {
      slide: 0,
      sliding: null,
    };
  },
  methods: {
    onSlideStart() {
      this.sliding = true;
    },
    onSlideEnd() {
      this.sliding = false;
    },
  },
};
</script>

<style scoped>
.main {
  margin-top: 50px;
}
.gold {
  background-image: url('../../public/home-1.jpg');
  text-align: left;
  font-weight: bold;
}
.silver {
  background-image: url('../../public/home-2.jpg');
  text-align: left;
  font-weight: bold
}

.title {
  font-size: 24px;
}

.lat-price {
  font-size: 12px
}

.info {
  height: 150px;
  background-color: #23427e;
  color: white;
  font-weight: bold;
}

.buy {
  display: flex;
  align-items:center;
  justify-content: center
}

.btn, .btn:focus {
  width: 250px !important;
  font-size: 16px !important;
  font-weight: bold;
  background-color: #cb9b2d;
  border: #cb9b2d;
  box-shadow: none !important
}

.btn:hover {
  background-color: #927020
}

.desc {
  margin-top: 15px;
  font-size: 10px;
  color: #cb9b2d
}

.desc-2 {
  font-size: 15px
}

.fas {
  color: #cb9b2d
}

</style>
