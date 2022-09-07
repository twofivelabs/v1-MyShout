export default function (req, res, next) {
  const url = req.url
  let deepLinkQuery = ''
  if (req.query && req.query.location) {
    deepLinkQuery = req.query.location
  }
  const userAgent = req.headers['user-agent']
  const isIpad = userAgent.match(/iPad/)
  const isAndroid = userAgent.match(/Android/)
  const isIphone = userAgent.match(/iPhone/)
  const redirects = [
    {
      from: deepLinkQuery ? req.url : '',
      to: `login?isIpad=${isIpad}&isAndroid=${isAndroid}&isIphone=${isIphone}&location=${deepLinkQuery}`
    }
  ]
  const redirect = redirects.find(r => r.from === url)
  if (redirect) {
    res.writeHead(301, { Location: redirect.to })
    res.end()
  } else {
    next()
  }
}
