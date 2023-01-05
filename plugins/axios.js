export default function ({ $axios, app }) {
  $axios.onRequest((config) => {
    config.headers.common = {
      mode: 'no-cors',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Expose-Headers': 'Access-Control-*',
      'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
      'Access-Control-Allow-Methods': 'GET, PATCH, POST, PUT, DELETE, OPTIONS, HEAD',
      Allow: 'GET, PATCH, POST, PUT, DELETE, OPTIONS, HEAD',
      'Content-Type': 'application/json'
    }
  })
  $axios.interceptors.response.use((response) => {
    if (response.status === 200) {
      if (response.request.responseURL && response.request.responseURL.includes('login')) {
        // ...
      }
    } else {
      app.$system.log({
        comp: 'Axios',
        msg: 'URL Error',
        val: response.request.responseURL
      })
    }
    return response
  })
  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    if (code === 401) {
      // redirect('/login')
    } else {
      app.$system.log({
        comp: 'Axios',
        msg: 'Error',
        val: error
      })
    }
  })
}
