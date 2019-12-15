<template>
    <div>
      <v-card
        class="mx-auto"
      >
        <v-app-bar dark color="pink">
          <v-toolbar-title>My Transaction</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-app-bar>

        <v-container>
          <v-row dense>
            <v-col cols="12">
              <div color="#385F73" dark class="d-flex flex-wrap justify-center">
                  <v-card
                    class="mx-auto my-3"
                    :shaped="true"
                    :raised="true"
                    v-for="item in getTransaction" :key="item._id"
                    outlined
                  >
                    <v-list-item three-line>
                      <v-list-item-content>
                        <div class="overline mb-4">{{item._id}}</div>
                        <div class="overline mb-4">Customer : {{item.UserId.username}}</div>
                        <v-list-item-title class="headline mb-1">
                          Transaction Detail
                        </v-list-item-title>
                        <v-btn text color="error" v-if="item.status == 'onprocess'">Status : {{ item.status }}</v-btn>
                        <v-btn text color="warning" v-else-if="item.status == 'sent'">Status : {{ item.status }}</v-btn>
                        <v-btn text color="success" v-else-if="item.status == 'received'">Status : {{ item.status }}</v-btn>
                        <v-list-item-subtitle>
                            <v-simple-table>
                              <template>
                                <thead>
                                  <tr>
                                    <th class="text-left">Image</th>
                                    <th class="text-left">Name</th>
                                    <th class="text-left">Qty</th>
                                    <th class="text-left">Cost</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr v-for="(data,index) in item.listProduct" :key="index">
                                    <td><img :src="data.productId.image" alt=""></td>
                                    <td>{{ data.productId.name }}</td>
                                    <td>{{ data.amount }}</td>
                                    <td>{{ data.cost }}</td>
                                  </tr>
                                  <tr>
                                    <td></td>
                                    <td></td>
                                    <td>Sub Total</td>
                                    <td>{{ item.totalCost }}</td>
                                  </tr>
                                </tbody>
                              </template>
                          </v-simple-table>
                        </v-list-item-subtitle>
                      </v-list-item-content>

                      <v-list-item-avatar tile size="80" color="grey">
                        <img :src="item.UserId.avatar" alt="">
                      </v-list-item-avatar>
                    </v-list-item>

                    <v-card-actions class="d-flex justify-center">
                      <v-btn color="warning" v-if="item.status === 'onprocess' && getRole == 'admin' ">Send Item</v-btn>
                      <v-btn color="success" v-if="item.status === 'sent' && getRole === 'customer'">Confirmed</v-btn>
                    </v-card-actions>
                  </v-card>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  computed: {
    getTransaction () {
      return this.$store.state.transaction.listTransaction
    },
    getRole(){
      return this.$store.state.user.session
    }
  },
  created () {
    let role = this.$store.state.user.session
    this.$store.dispatch('transaction/fetchTransaction', role)
  }

}
</script>

<style>

</style>
