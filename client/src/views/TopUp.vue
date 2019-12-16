<template>
  <div class="topup">
      <h1>Top Up Balance</h1>
        <v-form>
          <v-text-field  v-model="amount" label="Amount" type="number" required :rules="amountRules"></v-text-field>
          <v-btn type="submit" color="success" @click.prevent="topup" block>Top Up</v-btn>
        </v-form>
  </div>
</template>

<script>
import instance from '../connection/axios'
import axiosErrorHandler from '../connection/axiosErrorHandler'

export default {
  name: 'topup',
  data () {
    return {
      amount: 0,
      amountRules: [
        (v) => v > 0 || 'Amount should greater than 0',
        (v) => !!Number(v) || 'Amount should be a number'
      ]
    }
  },
  methods: {
    topup () {
      console.log('topup()')
      let data = {
        balance: this.$store.state.loginUser.balance + Number(this.amount)
      }
      instance({
        method: 'PATCH',
        url: '/users',
        data,
        headers: {
          authorization: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          console.log('data => ', data)
          this.$store.commit('SET_USER', data)
          this.$store.commit('SHOW_SNACKBAR', {
            text: 'Top Up Success'
          })
          this.$router.push('/')
        })
        .catch(err => {
          console.log('err => ', err)
          axiosErrorHandler(err)
        })
    }
  }
}
</script>
