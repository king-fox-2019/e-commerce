<template>
    <div class="container">
      <div class="card">
        <div class="card-body" style="display: flex; justify-content: space-between">
          <div class="col-6">
                                      <b-card
                                :img-src="item.image"
                                img-alt="Image"
                            ></b-card>
          </div>
          <div class="col-6">
            <h2> {{ item.name }} </h2>
            <p><i>stock: {{ item.stock}}</i></p>
            <p class="card-text">{{ item.description }}</p>
          </div>
        </div>
      </div>
    <br>
    </div>
</template>

<script>
import myAxios from '@/configs/myAxios'

export default {
  name: 'detail',
  data () {
    return {
      item: {}
    }
  },
  methods: {
    fetchItem (id) {
      myAxios({
        method: 'GET',
        url: `/click/items/${id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          this.item = data.item
        })
        .catch(err => {
          this.$swal('error', err.response.data.error[0].message, 'error')
        })
    }
  },
  watch: {
    $route (to, form) {
      this.fetchItem(this.$route.params.id)
    }
  },
  created: function () {
    this.fetchItem(this.$route.params.id)
  }
}
</script>

<style>

</style>
