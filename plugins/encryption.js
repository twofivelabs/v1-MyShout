import SimpleCrypto from 'simple-crypto-js'

// Don't change this, or else everything will be un-readable
const secretKey = "47d4n7wV5j6pO#^^ww*bTcc0B"
const simpleCrypto = new SimpleCrypto(secretKey)

export default (_, inject) => {
  inject('encryption', {
    encrypt(value) {
        return simpleCrypto.encrypt(value)
    },
    decrypt(value) {
        try {
            return simpleCrypto.decrypt(value)
        } catch (e) {
            return value
        }
    }
  })
}
