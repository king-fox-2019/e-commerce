<template>
  <v-container fluid class="px-0 py-0">
    <v-row justify="center">
      <p
        v-if="cont.name == 'tab1' && currenttab == 'tab1'"
        class="txt"
        v-html="cont.text"
      ></p>
      <p
        v-if="cont.name == 'tab2' && currenttab == 'tab2'"
        class="txt"
        v-html="cont.text"
      ></p>
      <p
        v-if="cont.name == 'tab3' && currenttab == 'tab3'"
        class="txt"
        v-html="cont.text"
      ></p>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "ContentTab3",
  props: {
    cont: {
      type: Object
    },
    currenttab: {
      type: String
    }
  }
};
</script>

<style></style>
