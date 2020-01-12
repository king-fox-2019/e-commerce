export default {
  methods: {
    toast(message) {
      this.$buefy.toast.open(message)
    },
    success(message) {
      this.$buefy.toast.open({
        message: message,
        type: 'is-success'
      })
    },
    danger(message) {
      this.$buefy.toast.open({
        duration: 5000,
        message: message,
        // position: 'is-bottom',
        type: 'is-danger'
      })
    }
  }
}