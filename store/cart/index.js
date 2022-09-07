import lodash from 'lodash'
import { computed, reactive } from '@nuxtjs/composition-api'
import FirestoreHelpers from '~/classes/FirestoreHelpers'

const dbRootPath = 'Carts'

class Cart extends FirestoreHelpers {
  constructor (data = {}) {
    super()
    this.data = data
    this.fields = {
      id: '',
      uid: '',
      status: 'shopping', // shopping, received, ready_to_ship, ready_for_pickup, in_transit, completed
      shipping_instructions: '',
      sub_total: 0,
      bottle_deposit_total: 0,
      tip_total: 0,
      shipping_total: 0,
      taxes: 0,
      total: 0,
      total_after_tip: 0,
      taxes_applied: [],
      items: [],
      item_count: 0,
      grouped: {
        items: {},
        shipping: {},
        shipping_options: {},
        taxes: {},
        totals: {}
      },
      bill_to: '',
      ship_to: ''
    }
    return this
  }

  write () {
    return this
  }

  read () {
    return this
  }
}

const dataConverter = {
  toFirestore (data) {
    delete data.item
    return new Cart(data).merge().write().format('write')
  },
  fromFirestore (snapshot, options) {
    const data = snapshot.data(options)
    return new Cart(data).read().format('read')
  }
}

export const state = () => reactive({
  current: new Cart({}).fields,
  archived: {},
  address: {}
})

export const getters = {
  cart: (state) => {
    try {
      return state
    } catch {
      return false
    }
  },
  current: (state) => {
    try {
      return state.current
    } catch {
      return false
    }
  }
}

export const mutations = {
  SET_ACTIVE_ADDRESS: (state, data) => {
    state.address = lodash.cloneDeep(data)
  },
  SET_CURRENT: (state, data) => {
    state.current = data
  },
  SET_UID: (state, data) => {
    state.current.uid = data
  },

  // ITEMS
  SET_ITEMS: (state, data) => {
    state.current.items = data
    if (Object.keys(state.current.items).length <= 0) {
      // console.log('CART > SET_ITEMS, Reset Item Store')
      lodash.set(state, 'current.grouped.totals', {})
      lodash.set(state, 'current.grouped.shipping', {})
      lodash.set(state, 'current.grouped.shipping_options', {})
      lodash.set(state, 'current.grouped.taxes', '')
      state.current.taxes = 0
      state.current.fee_total = 0
    }
  },
  SET_GROUP_ITEMS: (state, data) => {
    try {
      state.current.grouped.items = data
    } catch (e) {
      // console.log('CART > SET_GROUP_ITEMS', e)
    }
  },
  SET_ITEM_COUNT: (state) => {
    let count = 0
    try {
      count = Object.keys(state.current.items).length
    } catch (e) {
      // console.log('CART > SET_ITEM_COUNT, Error with item count')
    }
    state.current.item_count = count
  },

  // SUB TOTALS
  SET_SUB_TOTAL: (state, data) => {
    try {
      state.current.sub_total = data
    } catch (e) {
      // console.log('CART > SET_SUB_TOTAL', e)
    }
  },
  SET_GROUP_SUB_TOTAL: (state, {
    groupKey,
    subTotal
  }) => {
    try {
      if (groupKey) {
        lodash.set(state, `current.grouped.totals[${groupKey}].sub_total`, subTotal)
      }
    } catch (e) {
      // console.log('CART > SET_GROUP_SUB_TOTAL', e)
    }
  },

  // FEE
  SET_GROUP_FEE: (state, groupKey) => {
    try {
      if (groupKey) {
        lodash.set(state, `current.grouped.totals[${groupKey}].fee`, window.__NUXT__.config.perVendorFee)
      }
    } catch (e) {
      // console.log('CART > SET_GROUP_FEE', e)
    }
  },
  SET_ORDER_FEE_TOTAL: (state, total) => {
    try {
      lodash.set(state, 'current.fee_total', total)
    } catch (e) {
      // console.log('CART > SET_ORDER_FEE_TOTAL', e)
    }
  },

  // COUPONS / DISCOUNTS
  SET_GROUP_DISCOUNT: (state, {
    groupKey,
    discount
  }) => {
    try {
      if (groupKey) {
        // // console.log('ISNAN', lodash.isNaN(discount))
        if (!lodash.isNaN(discount)) {
          state.current.grouped.totals[groupKey].discount = discount
          // lodash.set(state, `current.grouped.totals[${groupKey}].discount`, discount)
        }
      }
    } catch (e) {
      // console.log('CART > SET_GROUP_DISCOUNT', e)
    }
  },

  // TAXES
  SET_TAXES_APPLIED: (state, data) => {
    try {
      state.current.taxes_applied = data
    } catch (e) {
      // console.log('CART > SET_TAXES_APPLIED', e)
    }
  },
  SET_GROUP_SHIPPING_TAXES: (state, {
    groupKey,
    shippingGroupTaxes
  }) => {
    if (groupKey) {
      try {
        let taxTotal = 0
        lodash.forOwn(shippingGroupTaxes, (value) => {
          taxTotal += value
        })
        lodash.set(state, `current.grouped.taxes[${groupKey}].shipping`, { ...shippingGroupTaxes })
        lodash.set(state, `current.grouped.totals[${groupKey}].tax_shipping`, taxTotal)
      } catch (e) {
        // console.log('CART > SET_GROUP_SHIPPING_TAXES', e)
      }
    }
  },
  SET_GROUP_TAXES: (state, {
    groupKey,
    data
  }) => {
    try {
      if (groupKey === null) {
        // lodash.set(state, 'current.grouped.taxes', null)
      } else {
        let taxTotal = 0
        lodash.forOwn(data, (value) => {
          taxTotal += value
        })
        lodash.set(state, `current.grouped.taxes[${groupKey}].other`, { ...data })
        lodash.set(state, `current.grouped.totals[${groupKey}].tax_other`, taxTotal)
      }
    } catch (e) {
      // console.log('CART > SET_GROUP_TAXES', e)
    }
  },
  SET_GROUP_TOTAL_TAX: (state, groupKey) => {
    try {
      if (groupKey) {
        let taxTotal = 0
        taxTotal += lodash.get(state, `current.grouped.totals[${groupKey}].tax_other`, 0)
        taxTotal += lodash.get(state, `current.grouped.totals[${groupKey}].tax_shipping`, 0)
        lodash.set(state, `current.grouped.totals[${groupKey}].tax`, taxTotal)
      }
    } catch (e) {
      // console.log('CART > SET_GROUP_TOTAL_TAX', e)
    }
  },
  SET_ORDER_TAX_TOTAL: (state, total) => {
    try {
      lodash.set(state, 'current.taxes', total)
    } catch (e) {
      // console.log('CART > SET_ORDER_TAX_TOTAL', e)
    }
  },

  // BOTTLE DEPOSITS
  SET_BOTTLE_DEPOSIT: (state, totalBottleDeposit) => {
    try {
      if (lodash.isNaN(totalBottleDeposit) || !totalBottleDeposit) {
        totalBottleDeposit = 0
      }
      state.current.bottle_deposit_total = totalBottleDeposit
    } catch (e) {
      // console.log('CART > SET_BOTTLE_DEPOSIT', e)
    }
  },
  SET_GROUP_BOTTLE_DEPOSIT: (state, {
    groupKey,
    bottleDeposit
  }) => {
    try {
      if (groupKey) {
        lodash.set(state, `current.grouped.totals[${groupKey}].bottle_deposit`, bottleDeposit)
      }
    } catch (e) {
      // console.log('CART > SET_GROUP_BOTTLE_DEPOSIT', e)
    }
  },

  // SHIPPING
  SET_SHIPPING_TOTAL: (state, data) => {
    try {
      if (lodash.isNaN(data) || !data) {
        data = 0
      }
      state.current.shipping_total = data
    } catch (e) {
      // console.log('CART > SET_SHIPPING_TOTAL', e)
    }
  },
  SET_GROUP_SHIPPING: (state, {
    groupKey,
    data
  }) => {
    try {
      if (groupKey) {
        if (lodash.isNaN(data.cost) || !data.cost) {
          data.cost = 0
        }
        lodash.set(state, `current.grouped.shipping[${groupKey}]`, data)
        if (data.cost) {
          lodash.set(state, `current.grouped.totals[${groupKey}].shipping`, data.cost)
        } else {
          lodash.set(state, `current.grouped.totals[${groupKey}].shipping`, 0)
        }
      }
    } catch (e) {
      // console.log('CART > SET_GROUP_SHIPPING', e)
    }
  },
  SET_GROUP_SHIPPING_OPTIONS: (state, {
    groupKey,
    data
  }) => {
    try {
      if (data === null) {
        lodash.set(state, 'current.grouped.shipping_options', data)
      } else {
        lodash.set(state, `current.grouped.shipping_options[${groupKey}]`, data)
      }
    } catch (e) {
      // console.log('CART > SET_GROUP_SHIPPING_OPTIONS', e)
    }
  },
  SET_VALID_SHIPPING_CONDITIONS: (state, {
    groupKey,
    data
  }) => {
    if (data) {
      lodash.set(state, `current.valid_shipping_conditions[${groupKey}]`, data)
    }
  },

  // TOTALS
  SET_TOTAL: (state, data) => {
    try {
      if (lodash.isNaN(data) || !data) {
        data = 0
      }
      state.current.total = data
    } catch (e) {
      // console.log('CART > SET_TOTAL', e)
    }
  },
  SET_TOTAL_AFTER_TIP: (state, data) => {
    try {
      if (lodash.isNaN(data) || !data) {
        data = 0
      }
      state.current.total_after_tip = data
    } catch (e) {
      // console.log('CART > SET_TOTAL_AFTER_TIP', e)
    }
  },
  SET_GROUP_TOTAL: (state, {
    groupKey,
    groupTotal
  }) => {
    try {
      if (groupKey === null) {
        // lodash.set(state, 'current.grouped.totals', {})
      } else {
        if (lodash.isNaN(groupTotal) || !groupTotal) {
          groupTotal = 0
        }
        lodash.set(state, `current.grouped.totals[${groupKey}].total`, groupTotal)
      }
    } catch (e) {
      // console.log('CART > SET_GROUP_TOTAL', e)
    }
  },

  // MISC
  SET_ADDITIONAL_MESSAGE: (state, data) => {
    try {
      state.current.additional_message = data
    } catch (e) {
      // console.log('CART > SET_ADDITIONAL_MESSAGE', e)
    }
  },
  SET_BILL_TO: (state, data) => {
    try {
      state.current.bill_to = data
    } catch (e) {
      // console.log('CART > SET_BILL_TO', e)
    }
  },
  SET_SHIP_TO: (state, data) => {
    try {
      state.current.ship_to = data
    } catch (e) {
      // console.log('CART > SET_SHIP_TO', e)
    }
  }
}

export const actions = {
  async add (_, data) {
    const uid = data.uid
    if (uid) {
      return await this.$db.update(`${dbRootPath}/${uid}`, null, data, false)
      // Don't need to set, as the state is already set
    }
  },
  async addOrder ({ rootState }, data) {
    const uid = rootState.user.data.uid
    if (uid) {
      const response = await this.$db.add(`${dbRootPath}/${uid}/Orders`, null, data)
      if (response !== false) {
        // console.log('CART: addOrder, ', response)
        return response
      }
    } else {
      // console.log('CART: addOrder, NO UID')
    }
  },
  async getCurrent ({ commit }, uid) {
    const one = await this.$db.get_one(`${dbRootPath}/${uid}`)
    if (one && one.items) {
      await commit('SET_CURRENT', one)
      await commit('cart/item/INIT_ITEMS', one.items, { root: true })
    }
    return one
  },
  async getCartTaxesApplied ({
    dispatch,
    rootState,
    commit
  }) {
    let province
    try {
      if (rootState.user.profile.location.province) {
        province = computed(() => rootState.user.profile.location.province)
      }
    } catch {
      // ...
    }

    if (!province || !province.value) {
      province.value = 'BC' // DEFAULT
    }

    const taxesApplied = await dispatch('taxes/search', {
      term: province.value,
      field: 'province'
    }, { root: true })
    await commit('SET_TAXES_APPLIED', taxesApplied)
  },

  /*
   * ITEMS
   */
  async groupItems ({
    state,
    commit
  }) {
    const grouped = lodash.groupBy(state.current.items, 'company.id')
    await commit('SET_GROUP_ITEMS', grouped)
  },

  /*
   * BOTTLE DEPOSITS
   */
  async calculateGroupBottleDeposit ({
    state,
    commit
  }) {
    let totalBottleDeposit = 0

    for (const groupKey in state.current.grouped.items) {
      let bottleDeposit = lodash.sumBy(state.current.grouped.items[groupKey], (item) => {
        return item.quantity * item.bottle_deposit
      })
      if (lodash.isNaN(bottleDeposit) || !bottleDeposit) {
        bottleDeposit = 0
      }
      totalBottleDeposit += bottleDeposit
      await commit('SET_GROUP_BOTTLE_DEPOSIT', {
        groupKey,
        bottleDeposit
      })
    }
    await commit('SET_BOTTLE_DEPOSIT', totalBottleDeposit)
  },

  /*
   * SHIPPING
   */
  async calculateGroupShipping ({
    commit,
    state,
    dispatch
  }, {
    groupKey,
    data
  }) {
    const groupItems = state.current.grouped.items[groupKey]
    const shippingGroupTaxes = {}
    let shippingCost = data.cost
    if (lodash.isNaN(shippingCost)) {
      shippingCost = 0
    }
    for (const itemKey in groupItems) {
      const taxesForShipping = lodash(state.current.taxes_applied)
        .filter({ type: groupItems[itemKey].type })
        .map('conditions')
        .flatten()
        .filter({ shipping: true })
        .value()

      if (taxesForShipping) {
        for (const taxKey in taxesForShipping) {
          shippingGroupTaxes[taxesForShipping[taxKey].label] = (taxesForShipping[taxKey].percent / 100) * shippingCost
        }
        await commit('SET_GROUP_SHIPPING_TAXES', {
          groupKey,
          shippingGroupTaxes
        })
        await commit('SET_GROUP_TOTAL_TAX', groupKey)
      }
    }
    await commit('SET_GROUP_SHIPPING', {
      groupKey,
      data
    })
    await dispatch('syncCart')
  },
  /**
   * Shipping Options are obtained when item is added to cart.
   * @param state
   * @param commit
   * @param dispatch
   * @returns {Promise<void>}
   */
  async getShippingOptions ({
    state,
    commit,
    dispatch
  }) {
    if (state.current.grouped.items && Object.keys(state.current.grouped.items).length > 0) {
      // await commit('SET_GROUP_SHIPPING_OPTIONS', { groupKey: null, data: {} })
      const companies = lodash.invert(Object.keys(state.current.grouped.items))
      for (const groupKey in companies) {
        const shipping = await dispatch('shipping/search', {
          term: groupKey,
          field: 'applies_to.id',
          operator: '=='
        }, { root: true })
        if (shipping && shipping[0]) {
          // TODO: If a business has more than 1 shipping (option) we will need to change here
          const data = await dispatch('validateShippingConditions', {
            groupKey,
            conditions: shipping
          })
          await commit('SET_GROUP_SHIPPING_OPTIONS', {
            groupKey,
            data
          })
        }
      }

      /**
       * Added a save here to help when users update the checkout it saves it in the db
       */
      await dispatch('add', state.current)
    }
  },
  async validateShippingConditions ({
    state,
    commit,
    dispatch
  }, {
    groupKey,
    conditions
  }) {
    const shippingConditions = conditions[0].conditions
    const items = state.current.grouped.items[groupKey]
    const validPostal = await dispatch('validatePostalConditions', conditions)

    if (!validPostal) {
      return [{
        cost: 'FREE',
        label: 'Pickup Only Available In Your Location'
      }]
    }

    shippingConditions.forEach((condition, conKey) => {
      if (condition.type && condition.type === 'Item Count') {
        const itemsQuantity = lodash.sumBy(items, 'quantity')
        if (itemsQuantity >= parseInt(condition.minimum)) {
          if (itemsQuantity > parseInt(condition.maximum)) {
            // Remove element if it doesn't meet requirements
            conditions.splice(conKey, 1)
          }
        } else {
          conditions.splice(conKey, 1)
        }
      } else if (condition.type && condition.type === 'Price') {
        let itemsSubtotal = lodash.sumBy(items, 'total')
        itemsSubtotal = itemsSubtotal / 100
        if (itemsSubtotal >= parseInt(condition.minimum)) {
          if (itemsSubtotal > parseInt(condition.maximum)) {
            // Remove element if it doesn't meet requirements
            shippingConditions.splice(conKey, 1)
          }
        } else {
          shippingConditions.splice(conKey, 1)
        }
      }
    })
    await commit('SET_VALID_SHIPPING_CONDITIONS', {
      groupKey,
      data: shippingConditions
    })
    return shippingConditions
  },

  /**
   * TODO: We should look at using more global postalCodes (IE: V4V..., not just V4V1R7)
   * @param state
   * @param rootState
   * @param conditions
   * @returns {boolean}
   */
  validatePostalConditions ({
    rootState,
    state
  }, conditions) {
    if (conditions[0].postal_codes) {
      try {
        const shippingGroupCodes = conditions[0].postal_codes.split(',').map(item => item.replace(/\s/g, '').toUpperCase())
        let userPostal = rootState.user.profile.location.postal
        if (state.address.billing.postal && state.address.billing.postal.length > 2) {
          userPostal = state.address.billing.postal
        }
        if (state.address.shipping.postal && state.address.shipping.postal.length > 2) {
          userPostal = state.address.shipping.postal
        }
        // TODO: CHECK HERE FOR POSTAL SHIPPING / BILLING
        if (shippingGroupCodes.includes(userPostal.replace(/\s/g, '').toUpperCase()) === true) {
          return true
        }
      } catch (e) {
        // console.log('CART: validatePostalConditions, not able to get postal')
        return false
      }
    } else {
      return true
    }
  },

  /*
   * TAXES
   */
  async calculateGroupTotalTaxes ({
    commit,
    state
  }) {
    await commit('SET_GROUP_TAXES', {
      groupKey: null,
      data: null
    })
    for (const groupKey in state.current.grouped.items) {
      const taxes = {}
      let discount = 0
      try {
        discount = state.current.grouped.totals[groupKey].discount
          ? state.current.grouped.totals[groupKey].discount
          : 0
      } catch (e) {
        /* ... No discount */
      }

      lodash.forEach(state.current.grouped.items[groupKey], (item) => {
        const itemCost = (item.quantity * item.price) - discount
        const taxesForItem = lodash.find(state.current.taxes_applied, { type: item.type })

        if (taxesForItem) {
          taxesForItem.conditions.forEach((condition) => {
            if (taxes[condition.label]) {
              taxes[condition.label] += Math.round((condition.percent / 100) * itemCost)
            } else {
              taxes[condition.label] = Math.round((condition.percent / 100) * itemCost)
            }
          })
        }
      })
      await commit('SET_GROUP_TAXES', {
        groupKey,
        data: taxes
      })
      await commit('SET_GROUP_TOTAL_TAX', groupKey)
    }
  },

  /*
   * CALCULATE SUB TOTAL
   */
  async calculateSubTotal ({
    commit,
    state,
    dispatch
  }) {
    // Grouped Sub Totals
    await dispatch('calculateGroupedSubTotals')

    let subTotal = 0
    try {
      for (const groupKey in state.current.grouped.totals) {
        subTotal += state.current.grouped.totals[groupKey].sub_total
      }
    } catch (e) {
      // console.log('CART > calculateSubtotal, not able to get sub_total')
    }
    await commit('SET_SUB_TOTAL', subTotal)
    await commit('SET_TOTAL', subTotal)
    await commit('SET_TOTAL_AFTER_TIP', subTotal)
  },
  async calculateGroupedSubTotals ({
    state,
    commit
  }) {
    for (const groupKey in state.current.grouped.items) {
      let discount = 0
      try {
        discount = state.current.grouped.totals[groupKey].discount
          ? state.current.grouped.totals[groupKey].discount
          : 0
      } catch (e) { /* ... No discount */
      }

      const subTotal = lodash.sumBy(state.current.grouped.items[groupKey], (item) => {
        return (item.quantity * item.price) - discount
      })
      await commit('SET_GROUP_SUB_TOTAL', {
        groupKey,
        subTotal
      })
      await commit('SET_GROUP_FEE', groupKey)
    }
  },

  /*
   * CALCULATE COUPON
   */
  async calculateCoupon ({
    state,
    dispatch
  }, coupon) {
    if (coupon) {
      const c = await dispatch('coupons/getOne', coupon, { root: true })
      if (c === false) {
        return c
      }
      if (state.current.grouped.items && Object.keys(state.current.grouped.items).length > 0) {
        const companies = lodash.invert(Object.keys(state.current.grouped.items))
        for (const groupKey in companies) {
          if (lodash.find(c.applies_to, { id: groupKey })) {
            await dispatch('validateAndApplyCoupon', {
              groupKey,
              condition: c
            })
          }
        }
      }
    }
  },
  validateAndApplyCoupon ({
    state,
    commit
  }, {
    groupKey,
    condition
  }) {
    if (condition) {
      let isValidToApply = false
      const subTotal = state.current.grouped.totals[groupKey].sub_total
      const itemCartCount = lodash.sumBy(state.current.grouped.items[groupKey], 'quantity')

      if (condition.published === false) {
        return false
      }

      // CART DISCOUNT
      if (!lodash.isNull(condition.cart.discount)) {

        isValidToApply = !(!lodash.isNull(condition.cart.min_sub_total) && (subTotal < this.$helper.dollarsToCents(condition.cart.min_sub_total)))
        if (!lodash.isNull(condition.cart.min_quantity) && (itemCartCount < condition.cart.min_quantity)) {
          isValidToApply = false
        }
        // eslint-disable-next-line brace-style
      }
      // PRODUCT DISCOUNT
      else if (!lodash.isNull(condition.product.discount)) {
        state.current.items.forEach((item) => {
          if (condition.product.ids.includes(item.id)) {
            isValidToApply = true
            let discount = 0
            let productQuantity = 0
            let productPrice = 0
            try {
              productQuantity = lodash.filter(state.current.grouped.items[groupKey], { id: item.id })[0].quantity
              productPrice = lodash.filter(state.current.grouped.items[groupKey], { id: item.id })[0].price

              if (condition.product.type === 'dollar') {
                discount = productQuantity * this.$helper.dollarsToCents(condition.product.discount)
              } else if (condition.product.type === 'percent') {
                const itemSubTotal = productQuantity * productPrice
                discount = Math.round((condition.product.discount / 100) * itemSubTotal)
              }
              commit('SET_GROUP_DISCOUNT', {
                groupKey,
                discount
              })
            } catch (e) {
              // ...
            }
          }
        })
      }
      return isValidToApply
    }
  },

  /*
   * CALCULATE TOTAL
   */
  async calculateGroupTotal ({
    state,
    commit
  }) {
    let orderTotal = 0
    let orderTaxTotal = 0
    let orderFeeTotal = 0
    let orderShippingTotal = 0
    await commit('SET_GROUP_TOTAL', {
      groupKey: null,
      groupTotal: null
    })

    for (const groupKey in state.current.grouped.items) {
      let groupTotal = 0

      try {
        groupTotal += state.current.grouped.totals[groupKey].sub_total
          ? state.current.grouped.totals[groupKey].sub_total
          : 0

        groupTotal += state.current.grouped.totals[groupKey].shipping
          ? state.current.grouped.totals[groupKey].shipping
          : 0

        orderShippingTotal += state.current.grouped.totals[groupKey].shipping
          ? state.current.grouped.totals[groupKey].shipping
          : 0

        groupTotal += state.current.grouped.totals[groupKey].bottle_deposit
          ? state.current.grouped.totals[groupKey].bottle_deposit
          : 0

        groupTotal += state.current.grouped.totals[groupKey].tax
          ? state.current.grouped.totals[groupKey].tax
          : 0

        groupTotal += state.current.grouped.totals[groupKey].fee
          ? state.current.grouped.totals[groupKey].fee
          : 0

        orderFeeTotal += state.current.grouped.totals[groupKey].fee
          ? state.current.grouped.totals[groupKey].fee
          : 0

        orderTaxTotal += state.current.grouped.totals[groupKey].tax
          ? state.current.grouped.totals[groupKey].tax
          : 0
      } catch (e) {
        // console.log('CART > calculateGroupTotal, trying to get sub_total / bottle_deposit')
      }

      // Used for Grand Order Total
      orderTotal += groupTotal

      await commit('SET_GROUP_TOTAL', {
        groupKey,
        groupTotal
      })
      await commit('SET_ORDER_TAX_TOTAL', orderTaxTotal)
      await commit('SET_ORDER_FEE_TOTAL', orderFeeTotal)
      await commit('SET_SHIPPING_TOTAL', orderShippingTotal)
    }
    return orderTotal
  },
  async calculateOrderTotal ({
    commit,
    dispatch
  }) {
    const orderTotal = await dispatch('calculateGroupTotal')
    await commit('SET_TOTAL', orderTotal)
    await commit('SET_TOTAL_AFTER_TIP', orderTotal)
  },

  async syncCart ({
    dispatch,
    commit,
    state,
    rootState
  }) {
    if (rootState.user.data.uid) {
      await commit('SET_UID', rootState.user.data.uid)
      await commit('SET_ITEM_COUNT')
      await dispatch('getCartTaxesApplied')
      await dispatch('groupItems')
      await dispatch('getShippingOptions')
      await dispatch('calculateSubTotal')
      await dispatch('calculateGroupBottleDeposit')
      await dispatch('calculateGroupTotalTaxes')
      await dispatch('calculateOrderTotal')

      // SyncDB
      await dispatch('add', state.current)
    }
  },
  async clearCart ({
    commit,
    dispatch,
    rootState
  }) {
    await commit('SET_ITEMS', {})
    await dispatch('syncCart')
    await this.$db.update(`${dbRootPath}/${rootState.user.data.uid}`, dataConverter, {})
  }
}
