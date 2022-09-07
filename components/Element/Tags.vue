<template>
  <div>
    <v-chip
        v-for="(tag, index) in tags"
        :key="index"
        :to="`/find/?tag=${tag}`"
        class="text-capitalize mr-1"
        nuxt
        outlined
        small
    >
      {{ tag }}
    </v-chip>
  </div>
</template>
<script>
export default {
  name: 'ElementTags',
  props: {
    tags: {
      type: Array,
      default: () => {
        return []
      }
    }
  }
}
</script>
