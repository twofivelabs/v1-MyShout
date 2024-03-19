import { reactive } from '@nuxtjs/composition-api'
import FirestoreHelpers from '~/classes/FirestoreHelpers'
import {
    stateController,
    setDataConverter,
    actionsController,
    gettersController,
    mutationsController,
} from '~/classes/storeController'

class Pages extends FirestoreHelpers {
  constructor (data) {
    super()
    this.data = data
    this.fields = {
      title: null,
      slug: null,
      content: null,
      isMarkdown: true,
      featured_image_url: null,
      language: {},
      meta: {
          author: this.state('users.id')
      }
    }
    this.multiLingualFields = {
      title: null,
      content: null
    }
    return this
  }

  write () {
    if (!this.fields.slug) {
      this.fields.slug = this.slugify(this.fields.title)
    }
    return this
  }

  read () {
    this.prepareMultiLingualProperties()
    return this
  }
}

export const state = () => reactive({
    ...stateController(Pages),
    'dataConverter': setDataConverter(Pages),
    'collectionName': 'Pages',
})

export const getters = {
    ...gettersController
}

export const mutations = {
    ...mutationsController
}

export const actions = {
    ...actionsController
}
