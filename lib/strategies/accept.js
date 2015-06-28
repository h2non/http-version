var acceptParser = require('http-accept')

module.exports = function accept(req) {
  var accept = req.headers['accept']
  if (!accept) return null

  var reqHeaders = { headers: req.headers }
  acceptParser(reqHeaders, null, function () {})

  var accepts = reqHeaders.accept.types
  if (!accepts || !accepts.length) return null

  return accepts.filter(function (part) {
    return part && part.params
  })
  .map(function (part) {
    return part.params.version
  })
  .shift() || null
}
