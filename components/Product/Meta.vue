<template>
  <div v-if="product">
    <v-row>
      <v-col v-if="product.ibu" class="text-center">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <div v-bind="attrs"
                 v-on="on"
            >
              <object
                  :data="`${$vuetify.theme.dark ? '/svg/ibu-white.svg' : '/svg/ibu.svg'}`"
                  style="max-width:30px; max-height:30px;"
                  type="image/svg+xml"
              >
                <img :src="`${$vuetify.theme.dark ? '/svg/ibu-white.svg' : '/svg/ibu.svg'}`"
                     alt="SRM"
                >
              </object>
            </div>
          </template>
          <span>International Bitterness Units scale, a gauge of beer's bitterness.</span>
        </v-tooltip>
        {{ product.ibu }} <small class="grey--text darken-1">IBU</small>
      </v-col>
      <v-col v-if="product.srm" class="text-center">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <div v-bind="attrs"
                 v-on="on"
            >
              <object
                  :data="`${$vuetify.theme.dark ? '/svg/srm-white.svg' : '/svg/srm.svg'}`"
                  style="max-width:30px; max-height:30px;"
                  type="image/svg+xml"
              >
                <img :src="`${$vuetify.theme.dark ? '/svg/srm-white.svg' : '/svg/srm.svg'}`"
                     alt="SRM"
                >
              </object>
            </div>
          </template>
          <span>Standard Reference Method (Srm) is the method for color assessment of wort or beer.</span>
        </v-tooltip>
        {{ product.srm }} <small class="grey--text darken-1">SRM</small>
      </v-col>
      <v-col v-if="product.abv" class="text-center">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <div v-bind="attrs"
                 v-on="on"
            >
              <object
                  :data="`${$vuetify.theme.dark ? '/svg/abv-white.svg' : '/svg/abv.svg'}`"
                  style="max-width:30px; max-height:30px;"
                  type="image/svg+xml"
              >
                <img :src="`${$vuetify.theme.dark ? '/svg/abv-white.svg' : '/svg/abv.svg'}`"
                     alt="SRM"
                >
              </object>
            </div>
          </template>
          <span>Alcohol by Volume. This is a standardized measurement of the amount of alcohol (ethanol) contained in a specific package.</span>
        </v-tooltip>
        {{ product.abv }} <small class="grey--text darken-1">ABV</small>
      </v-col>
    </v-row>
  </div>
</template>
<script>


import { computed, defineComponent, ref, useStore } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'ProductMetaComp',
  props: {
    product: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  setup () {
    const { state } = useStore()
    const user = computed(() => state.user.data)
    const profile = computed(() => state.user.profile)

    // DEFINE CONTENT
    const loading = ref(false)

    // METHODS

    // WATCH

    return {
      loading,
      user,
      profile
    }
  }
})
</script>
