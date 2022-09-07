<template>
  <div v-if="displayText" class="caption primary--text">
    {{ displayText }}
  </div>
</template>
<script>

import lodash from 'lodash'

import {
  computed,
  defineComponent,
  onBeforeMount,
  ref,
  useStore
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'PreviousLiked',
  props: {
    product: {
      type: Object,
      default: () => {
        return {}
      }
    },
    company: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  setup (props) {
    const { state } = useStore()
    const tagging = computed(() => state.user.tagging.all)
    const displayText = ref(null)

    // METHODS
    const likesThisCompany = () => {
      if (props.company && props.company.id) {
        if (lodash.find(tagging.value, {
          id: props.company.id,
          purchased: true
        })) {
          displayText.value = 'Previously ordered from here'
        } else if (lodash.find(tagging.value, {
          id: props.company.id,
          like: true
        })) {
          displayText.value = 'You like their products'
        }
      } else if (props.product && props.product.id) {
        if (lodash.find(tagging.value, {
          id: props.product.id,
          purchased: true
        })) {
          displayText.value = 'Previously ordered by you'
        }
      }
    }

    onBeforeMount(() => {
      likesThisCompany()
    })

    return {
      displayText
    }
  }
})
</script>
