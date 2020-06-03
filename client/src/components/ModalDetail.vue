<template>
  <div>
    <b-modal id="modal-lg" size="lg" v-if="data">
      <div class="container item">
        <div class="row">
          <div class="col-4 x">
            <img :src="data.image">
          </div>
          <div class="col-8 content">
            <b-card-text class="title"> {{ data.name }} - {{ data.weight }} gr </b-card-text>
            <b-card-text class="content"> Produced with high accuracy,
              Antam gold can be an alternative investment. </b-card-text>
            <div class=" d-flex align-items-center tax">
              <i class="fas fa-exclamation-circle ml-2 mr-2"></i>
              Price excelude value added tax</div>
            <b-card-text class="title mt-3"> Rp. {{ data.price.toLocaleString("id") }}</b-card-text>
          </div>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  props: ['data'],
};
</script>

<style scoped>
img {
  vertical-align: middle;
  border-style: none;
  width: 200px;
}

.x {
  width: 25%
}

.title {
  font-size: 26px;
  color: #cb9b2d;
}

.tax {
  height: 40px;
  color: #cb9b2d;
  font-size: 12px;
  border: 1px solid;
  border-radius: 10px
}

.content {
  text-align: justify;
}
</style>
