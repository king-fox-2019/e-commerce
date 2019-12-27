<template>
  <div>
    <ItemForm :itemData='itemData'></ItemForm>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
import ItemForm from './ItemForm.vue'
let baseUrl = 'http://localhost:3000'
export default {

  name: 'ItemDetail',

  data () {
    return {
      itemData: {}
    }
  },
  components: {
    ItemForm
  },
  methods: {
    
  },
  created(){
    axios({
      method: 'get',
      url: baseUrl + '/item/' + this.$route.params.id
    })
      .then((response) => {
        this.itemData = response.data
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
</script>

<style lang="css" scoped>
  img{
    width: 100%;
  }
</style>