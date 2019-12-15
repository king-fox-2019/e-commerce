<template>
  <b-container class="my-4" style="width: 60%">
    <h2 class="mb-4">Add Product</h2>
    <b-form-group
      id="fieldset-horizontal"
      label-cols-sm="4"
      label-cols-lg="3"
      label="Name"
      label-for="input-horizontal"
    >
      <b-form-input id="input-horizontal"></b-form-input>
    </b-form-group>

    <b-form-group
      id="fieldset-horizontal"
      label-cols-sm="4"
      label-cols-lg="3"
      label="Description"
      label-for="input-horizontal"
    >
      <b-form-textarea id="input-horizontal"></b-form-textarea>
    </b-form-group>

    <b-form-group
      id="fieldset-horizontal"
      label-cols-sm="4"
      label-cols-lg="3"
      label="Price"
      label-for="input-horizontal"
    >
      <b-form-input id="input-horizontal"></b-form-input>
    </b-form-group>

    <b-form-group
      id="fieldset-horizontal"
      label-cols-sm="4"
      label-cols-lg="3"
      label="Stock"
      label-for="input-horizontal"
    >
    
      <b-form-input type="number" min="0"></b-form-input>
    </b-form-group>

    <b-button type="submit" variant="primary">Submit</b-button>
  </b-container>

</template>

<script>
export default {

}
</script>

<style>

</style>