<template>
  <v-container class="mt-4">
    <ElementH1 align="left" class="mt-3" text="Your local craft"/>
    <ElementH2 align="left" class="mt-3" text="Your local craft"/>
    <ElementH3 align="left" class="mt-3" text="Your local craft"/>
    <ElementH4 align="left" class="mt-3" text="Your local craft"/>
    <ElementH5 align="left" class="mt-3" text="Your local craft"/>
    <ElementH6 align="left" class="mt-3" text="Your local craft"/>
    <v-btn @click="snowSnackbar">
      Show Snack
    </v-btn>
  </v-container>
</template>
<script>
export default {
  name: 'CssPage',
  methods: {
    snowSnackbar () {
      const snack = {
        title: 'Default',
        text: 'notification.body',
        color: 'blue',
        type: 'notification',
        id: 'TESTID123'
      }
      snack.goTo = '/profile'
      this.$notify.show(snack)
    }
  }
}
</script>
<style scoped>

</style>
