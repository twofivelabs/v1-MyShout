<template>
  <div :class="`price text-${align}`">
    <span v-if="salePrice && (salePrice !== 'null')">
      <span class="text-decoration-line-through text--disabled font-weight-regular">
        <small>{{ price }}</small>
      </span>
      {{ salePrice }}
    </span>
    <span v-else>
      {{ price }}
    </span>
  </div>
</template>
<script>

export default {
  name: 'ProductPrice',
  props: {
    price: {
      type: String,
      default: () => {
        return '0'
      }
    },
    salePrice: {
      type: String,
      default: () => {
        return null
      }
    },
    align: {
      type: String,
      default: 'center'
    }
  }
}
</script>
<style scoped>
.price {
  font-size: 13px;
}
</style>
