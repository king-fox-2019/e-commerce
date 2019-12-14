<template>
  <div>
    <b-card no-body class="overflow-hidden" style="max-width: 540px;">
      <b-row no-gutters>
        <b-col md="6">
          <b-card-img src="https://picsum.photos/400/400/?image=20" class="rounded-0"></b-card-img>
        </b-col>
        <b-col md="6">
          <b-card-body title="Horizontal Card">
            <b-card-text>
              {{this.$route.params}}
              {{data}}
              This is a wider card with supporting text as a natural lead-in to additional content.
              This content is a little bit longer.
            </b-card-text>
          </b-card-body>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>
<script>
import axios from '../../api/server';

export default {
  name: 'productdetail',
  data() {
    return {
      message: 'Hello world',
      data: {},
    };
  },
  methods: {},
  created() {
    const link = `products/${this.params.id}`;
    console.log(link);
    axios
      .get(`products/${this.$store.params.id}`)
      .then(({ data }) => {
        this.data = data;
        console.log(this.data, 'data');
      })
      .catch(console.log);
  },
};
</script>

<style scoped>
</style>
