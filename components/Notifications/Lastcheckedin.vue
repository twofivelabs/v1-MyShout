<template>
  <div v-if="checkedInDate" class="caption">
    {{ $t('notifications.checked_in_title') }}, {{ checkedInDate }}
  </div>
</template>
<script>
import {
  defineComponent,
  ref, useContext, useStore, onMounted,
} from '@nuxtjs/composition-api'
import { Touch } from 'vuetify/lib/directives'

export default defineComponent({
  name: 'NotificationsLastcheckedin',
  directives: { Touch },
  props: {
    publicUser: {
      type: Object,
      default: () => {}
    }
  },
  setup(props) {
    const { dispatch } = useStore()
    const { $system } = useContext()
    const loading = ref(false)
    const checkedInDate = ref(false)

    // METHODS
    const getLatestCheckin = async () => {
      loading.value = true
      try {
        const res = await dispatch('user/checkins/getAll', props?.publicUser?.id)
        if (res) {
          checkedInDate.value = res[0]?.updated_at
        }

      } catch(e) {
        $system.log({
          comp: 'NotificationsLastcheckedin',
          msg: 'Not able to get checkins',
          val: e
        })
      } finally {
        loading.value = false
      }
    }

    onMounted(() => {
      getLatestCheckin()
    })

    return {
      loading,
      getLatestCheckin,
      checkedInDate
    }
  }
})
</script>
