const config = {
  apiUrl: 'https://web.eshipper.com/rpc2',
  apiUsername: 'stickypages',
  apiPassword: '872283',
  rateAsResidentialShipment: true,
  signatureRequired: true,
  increaseRatesBy: 0 // Percentage factor
}

export default function (_, inject) {
  inject('eShipper', {
    setAddress (address) {
      return {
        postalCode: address.postalCode,
        country: address.country,
        province: address.province,
        city: address.city,
        name: address.name,
        address_1: address.address_1,
        address_2: address.address_2,
        phone: address.phone,
        address_type: address.address_type ? address.address_type : 'residential'
      }
    },
    async getSetCurrentPosition () {

    }

  })
}

