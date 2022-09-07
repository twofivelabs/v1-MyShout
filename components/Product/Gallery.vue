<template>
  <div>
    <v-card v-if="images" class="rounded-xl" flat>
      <v-window v-model="step" horizontal>
        <v-window-item v-for="n in images" :key="`card-${n}`">
          <v-card :height="`${$vuetify.breakpoint.smAndDown ? 310 : 410}`">
            <v-row align="center" class="fill-height" justify="center">
              <v-img
                  :height="`${$vuetify.breakpoint.smAndDown ? 300 : 400}`"
                  :src="n"
                  contain
                  lazy-src="/placeholder.png"
                  style="background-color:#fff;"
              />
            </v-row>
          </v-card>
        </v-window-item>
      </v-window>
      <v-card-actions v-if="showArrows" class="justify-space-between">
        <v-btn text @click="prev">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <v-btn text @click="next">
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
    <div v-else class="text--disabled">
      No image available
    </div>
  </div>
</template>
<script>

import { defineComponent, onMounted, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'ProductGallery',
  props: {
    images: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  setup (props) {
    const length = ref(props.images.length)
    const step = ref(0)
    const showArrows = ref(false)

    // MOUNTED
    onMounted(() => {
      showArrows.value = length.value >= 2
    })

    // METHODS
    const next = () => {
      step.value = step.value + 1 === length.value
          ? 0
          : step.value + 1
    }
    const prev = () => {
      step.value = step.value - 1 < 0
          ? length.value - 1
          : step.value - 1
    }

    return {
      length,
      step,
      showArrows,
      next,
      prev
    }
  }
})
</script>
