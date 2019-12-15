<template>
   <div> <!-- this is the card container-->
      <div>image container</div>
      <div>
         <span>item name</span>
      </div>
   </div>
</template>

<script>
export default {
   name: 'ItemCard',
   props: {
      item: {
         type: Object,
         required: true
      }
   },
}
</script>

<style>

</style>