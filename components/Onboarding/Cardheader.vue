<template>
  <v-card
      color="transparent"
      height=""
      class="rounded-t-xl"
      style="box-shadow: none !important;"
      v-anime="{
        translateY: [100, 0],
        duration: 1200,
        opacity: [0, 100],
        easing: 'easeInOutQuad'
      }"
  >
    <v-row
        align="center"
        class="fill-height"
        justify="center"
    >
      <v-card-text class="text-center">
        <h1 v-if="h1" class="display-3 font-weight-bold mb-1 gray--text">
          <v-icon v-if="prependIcon">
            {{ prependIcon }}
          </v-icon>
          {{ h1 }}
        </h1>
        <h2 v-if="h2" class="text-h3 gray--text">{{ h2 }}</h2>
      </v-card-text>
    </v-row>
  </v-card>
</template>
<script>
import { defineComponent, } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'OnboardingCardheader',
  props: {
    h1: {
      type: String,
      default: () => { return '' }
    },
    h2: {
      type: String,
      default: () => { return '' }
    },
    prependIcon: {
      type: String,
      default: null
    }
  },
  setup () {
    return {

    }
  }
})
</script>
