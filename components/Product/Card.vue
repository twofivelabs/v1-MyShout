<template>
  <div>
    <v-hover v-slot="{ hover }" :value="$vuetify.breakpoint.smAndDown">
      <v-card
          :elevation="hover ? 4 : 0"
          :width="$helper.cardWidth(isSlider)"
          class="rounded-xl product-card"
      >
        <!-- SHOW CARD POPUP -->
        <div class="image" @click="showDetails(product)">
          <v-img
              v-if="product.images && product.images[0]"
              :max-width="$helper.cardWidth(isSlider)"
              :src="$helper.getImageSize(product.images[0], 'thumbnail')"
              class="rounded-xl card-image align-end"
              contain
              height="150"
              lazy-src="/placeholder.png"
          >
            <v-card-title
                class="name white black--text rounded-b-xl mt-3 text-h6 justify-center text-center px-1 pt-1 pb-0"
            >
              {{ product.name }}
            </v-card-title>
          </v-img>
        </div>
        <v-card-subtitle
            class="pa-0 grey--text justify-center caption text-center lighten-1"
        >
          {{ product.company.name }}
        </v-card-subtitle>
        <ProductFavourite :product="product" style="position:absolute; top:0; right:0; "/>
        <!--        <v-card-actions>
                  <ProductCardactions :product="product"/>
                </v-card-actions>-->
      </v-card>
    </v-hover>
    <v-bottom-sheet
        v-model="showProductSheet"
        :scrollable="true"
        class="bottom-sheet"
        inset
        max-width="700"
    >
      <v-sheet
          class="pa-5 overflow-y-auto rounded-t-xl slide-up"
          height="75vh"
      >
        <GlobalSlidebar v-touch="{ down: () => swipe('Down') }"
                        @click.native="swipe('Down')"
        />
        <ProductCompany :company="product.company"/>
        <ProductGallery :images="product.images" class="rounded-xl elevation-24"/>
        <ElementH2 :class="`mt-4 ${$vuetify.theme.dark ? 'white--text' : 'black--text'}`"
                   :text="`${product.name}`"
                   align="left"
        />
        <ProductPrice v-if="!product.variations || product.variations.length <= 0"
                      :price="product.price" :salePrice="product.sale_price"
                      align="left" class="mt-2 text-h5 text--secondary"
        />
        <ProductVariations :product="product"/>
        <ProductAddtocart v-if="!product.out_of_stock" :product="product"/>
        <v-alert
            v-if="product.out_of_stock"
            class="my-3"
            icon="mdi-numeric-0-box-multiple-outline"
            type="warning"
        >Out of stock
        </v-alert>
        <ProductMeta :product="product"/>
        <div class="d-flex align-center mt-6 mb-6">
          <ProductLikes :dislikes="product.dislikes" :likes="product.likes"
                        :product="product"
          />
          <v-spacer/>
          <GlobalShare
              :payload="{ title: product.name, text: product.description, path: '/products/'+product.slug }"
              class="mr-2"
          />
          <ProductFavourite :product="product" class=""/>
        </div>
        <template v-for="(line, index) in product.description.split('\n')">
          <p :key="index">
            {{ line }}
          </p>
        </template>
        <div class="text-center">
          <v-btn :to="`/products/${product.slug}`" elevation="0" small>
            More Details
          </v-btn>
        </div>
        <div style="height:100px;"/>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>
<script>

import {
  computed,
  defineComponent,
  ref,
  useContext,
  useRouter,
  useStore
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
      default: () => {
        return {}
      }
    },
    isSlider: {
      type: Boolean,
      default: () => {
        return false
      }
    }
  },
  setup (props) {
    const { state } = useStore()
    const { $vuetify } = useContext()
    const router = useRouter()
    const user = computed(() => state.user.data)
    const profile = computed(() => state.user.profile)
    const loading = ref(false)

    // DEFINE CONTENT
    const productDetails = ref({})
    const showProductSheet = ref(false)

    // METHODS
    const showDetails = (product) => {
      if ($vuetify.breakpoint.smAndDown) {
        productDetails.value = Object.assign({}, product)
        showProductSheet.value = true
      } else {
        router.push(`/products/${props.product.slug}`)
      }
    }
    const swipe = (direction) => {
      if (direction === 'Down') {
        showProductSheet.value = false
      }
    }

    return {
      user,
      profile,
      loading,
      showProductSheet,
      productDetails,
      showDetails,
      swipe
    }
  }
})
</script>
