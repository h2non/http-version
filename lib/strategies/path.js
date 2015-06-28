var url = require('url')

module.exports = function path(req) {
  var path = url.parse(req.url).pathname
  if (!path || !~path.indexOf('/')) return null

  var base = path.split('/')[1]
  if (!base) return null

  var match = base.match(/^v?([0-9]+(\.[0-9]+)?(\.[0-9]+)?)$/i)
  if (match && match[1]) {
    return match[1]
  }

  return null
}
