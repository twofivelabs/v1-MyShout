<template>
  <span :class="`text-${align} text-subtitle-2`" style="font-weight:600;">
    {{ name }}
    <v-badge
      v-if="u.badges && u.badges.includes('Experienced')"
      title="Experienced"
      inline
      overlap
      color="success"
      icon="verified"
    />
  </span>
</template>
<script>

import {
  defineComponent,
  useFetch,
  onMounted,
  useContext,
  useStore,
  ref,
  reactive
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'UserName',
  props: {
    u: {
      type: Object,
      default: () => { return {} }
    },
    align: {
      type: String,
      default: 'left'
    }
  },
  setup (props) {
    const { dispatch } = useStore()
    const { $system } = useContext()
    const loading = ref(false)

    // DEFINE CONTENT
    const us = reactive({})
    const name = ref('Anonymous')

    // GET CONTENT
    useFetch(async () => {
      loading.value = true
      try {
        if (name.value === 'Anonymous') {
          const res = await dispatch('feedback/addUserToFeedback', props.u.id)
          setName(res)
        }
      } catch(e) {
        $system.log({ comp: 'UserName', msg: 'Getting user for comment', val: e })
      } finally {
        loading.value = false
      }
    })

    onMounted(() => {
      if (props.u && props.u.first_name) {
        setName(props.u)
      }
    })

    // METHODS
    const setName = (u) => {
      if (u) {
        if ((u.first_name && u.first_name.length > 1)) {
          name.value = `${u.first_name}`
        }
        if ((u.last_name && u.last_name.length > 1)) {
          name.value = `${name.value} ${u.last_name}`
        }
      }
    }

    return {
      loading,
      us,
      name
    }
  }
})
</script>
