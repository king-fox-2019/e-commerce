export default {
  methods: {
    confirmCustomDelete() {
      this.$buefy.dialog.confirm({
          title: 'Deleting account',
          message: 'Are you sure you want to <b>delete</b> your account? This action cannot be undone.',
          confirmText: 'Delete Account',
          type: 'is-danger',
          hasIcon: true,
          onConfirm: () => this.$buefy.toast.open('Account deleted!')
      })
  }
  }
}