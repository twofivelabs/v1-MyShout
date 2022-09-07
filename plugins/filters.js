import Vue from 'vue'

Vue.filter('dollarFormat', (dollars) => {
  if (dollars) {
    return dollars.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    })
  }
})

Vue.filter('centsToDollars', (amount) => {
  if (!amount) {
    amount = 0
  }
  const dollars = amount / 100
  return dollars.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD'
  })
})
