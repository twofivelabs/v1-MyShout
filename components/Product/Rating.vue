<template>
  <v-rating
    color="warning"
    hover
    length="5"
    readonly
    size="20"
    :value="rating"
  />
</template>
<script>

export default {
  name: 'ProductRating',
  props: {
    rating: {
      type: Number,
      default: () => { return 0 }
    }
  }
}
</script>
