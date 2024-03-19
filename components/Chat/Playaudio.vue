<template>
  <span>
    <v-btn @click="playAudio()" fab>
      <v-icon v-if="isPlaying">mdi-motion-play mdi-spin</v-icon>
      <v-icon v-else>mdi-play-circle</v-icon>
    </v-btn>
    <v-btn v-if="isPlaying" @click="stopAudio()" fab small plain>
      <v-icon>mdi-close</v-icon>
    </v-btn>
  </span>
</template>
<script>

import {
  defineComponent, useContext, ref
} from '@nuxtjs/composition-api'
import {Howl} from 'howler'

export default defineComponent({
  name: 'ChatPlayaudio',
  props: {
    file: {
      type: String,
      default: () => {
        return null
      }
    },
  },
  setup(props) {
    const { $fire } = useContext()
    const isPlaying = ref(false)
    const sound = ref()

    // METHODS
    const playAudio = () => {
      isPlaying.value = true
      // TODO: FIX AUTH
      const currUser = $fire.auth.currentUser
      sound.value = new Howl({
        src: [props.file],
        html5: true,
        volume: 1.0,
        xhr: {
          method: 'POST',
          headers: {
            Authorization: 'Bearer:' + currUser.refreshToken,
          },
          withCredentials: true,
        },
        onend: function() {
          console.log('Finished!')
          isPlaying.value = false
        }
      })
      sound.value.play()
    }
    const stopAudio = () => {
      sound.value.stop()
      isPlaying.value = false
    }

    // MOUNT

    return {
      isPlaying,
      playAudio,
      stopAudio
    }
  }
})
</script>
