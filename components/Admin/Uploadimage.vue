<template>
  <div>
    <div v-if="initial.filter(n => n) && initial.filter(n => n).length > 0"
         class="images ml-8 mb-2"
    >
      <div v-for="(img, index) in initial" :key="index" :class="[`image--${index}`]">
        <v-icon v-if="img" class="delete float-left" @click="deleteImage(img)">
          mdi-trash-can-outline
        </v-icon>
        <v-avatar>
          <v-img v-if="img" :src="img" max-height="180" max-width="80"/>
        </v-avatar>
      </div>
    </div>
    <v-file-input
        v-model="files"
        :multiple="multiple"
        append-outer-icon="mdi-cloud-upload"
        chips
        hide-details
        label="Images"
        outlined
        prepend-icon="mdi-camera"
        show-size
    >
      <template #append-outer>
        <v-btn :disabled="isUploadingImage" :loading="isUploadingImage"
               elevation="0" @click="uploadImages"
        >
          Save
          <v-icon dark right>
            mdi-cloud-upload
          </v-icon>
        </v-btn>
      </template>
    </v-file-input>
  </div>
</template>
<script>
export default {
  name: 'AdminUploadImage',
  props: {
    storage: {
      type: String,
      default: () => {
        return ''
      }
    },
    multiple: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    meta: {
      type: Object,
      default: () => {
        return {}
      }
    },
    initial: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  emits: [
    'urls'
  ],
  data () {
    return {
      files: [],
      urls: [],
      isUploadingImage: false,
      isDeletingImage: false
    }
  },
  watch: {
    urls () {
      if (this.multiple) {
        this.$emit('urls', this.urls)
      } else {
        this.$emit('urls', this.urls[0])
      }
    }
  },
  methods: {
    async uploadImages () {
      if (this.files.length) {
        for (const index in this.files) {
          await this.validateAndUpload(this.files[index])
        }
      } else {
        await this.validateAndUpload(this.files)
      }
    },

    async validateAndUpload (file) {
      if (!file.type.match('image.*')) {
        this.$notify.show({
          text: 'Error, not an appropriate file type',
          color: 'error'
        })
      } else {
        this.isUploadingImage = true
        // Create a reference to the destination where we're uploading
        const imageRef = this.$fire.storage.ref(`${this.storage}/${file.name}`)
        const url = await this.uploadImage(imageRef, file, this.meta)
        this.urls.push(url)
      }
      this.isUploadingImage = false
    },

    // Once the image is uploaded, obtain the download URL
    async uploadImage (imageRef, file, metadata) {
      return await imageRef.put(file, metadata).then(async (snapshot) => {
        return await snapshot.ref.getDownloadURL().then((url) => {
          return url
        })
      }).catch(() => {
        this.$notify.show({
          text: 'Error, try again',
          color: 'error'
        })
      })
    },

    deleteImage (url) {
      this.urls = this.removeImageUrl(this.initial, url)
      this.$fire.storage.refFromURL(url).delete()
          .then(() => {
            this.$notify.show({ text: 'Deleted' })
          })
          .catch(() => {
            this.$notify.show({
              text: 'Error, deleting image',
              color: 'error'
            })
          })
    },

    removeImageUrl (arr, value) {
      const index = arr.indexOf(value)
      if (index > -1) {
        arr.splice(index, 1)
      }
      return arr
    }

  }
}
</script>
