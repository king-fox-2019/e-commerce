<template>
  <div role="tablist" class="mr-5 mt-5 ml-5">
    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button block href="#" v-b-toggle.accordion-1 variant="info">
          Login
        </b-button>
      </b-card-header>
      <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">
        <b-card-body>
          <login @check="sentToApp"></login>
        </b-card-body>
      </b-collapse>
    </b-card>

    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button block href="#" v-b-toggle.accordion-2 variant="info">Register</b-button>
      </b-card-header>
      <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
        <b-card-body>
          <register></register>
        </b-card-body>
      </b-collapse>
    </b-card>
  </div>
</template>

<script>
import login from '@/components/login.vue';
import register from '@/components/register.vue';

export default {
  data() {
    return {
    };
  },
  methods: {
    sentToApp() {
      this.$emit('localstorage');
    },
  },
  components: {
    login,
    register,
  },
};
</script>
<style scoped>

</style>
