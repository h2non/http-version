var defaultStrategies = require('./strategies')

module.exports = function version(version, strategies, handle) {
  if (!version) {
    throw new TypeError('argument hostname is required')
  }

  if (typeof strategies === 'function') {
    handle = strategies
  }

  if (!Array.isArray(strategies)) {
    strategies = defaultStrategies
  }

  if (typeof handle !== 'function') {
    throw new TypeError('argument handle must be a function')
  }

  // create regular expression for version value
  var regexp = versionToRegexp(version)

  return function versionMiddleware(req, res, next){
    var versionData = versionOf(req, strategies, regexp)

    if (!versionData) {
      return next()
    }

    // expose
    req.version = versionData

    // handle
    handle(req, res, next)
  }
}

function versionOf(req, strategies, regexp) {
  var version = null

  for (var i = 0; i < strategies.length; i += 1) {
    version = strategies[i](req)
    if (version) {
      version = version.trim()
      break
    }
  }

  if (!version) return null

  return regexp.test(version)
    ? version
    : null
}

function versionToRegexp(val){
  var source = !isRegexp(val)
    ? String(val).replace(/([.+?^=!:${}()|\[\]\/\\])/g, '\\$1').replace(/\*/g, '([^\.]+)')
    : val.source

  // force leading anchor matching
  if (source[0] !== '^') {
    source = '^' + source
  }

  // force trailing anchor matching
  source = source.replace(/(\\*)(.)$/, function (s, b, c){
    return c !== '$' || b.length % 2 === 1
      ? s + '$'
      : s
  })

  return new RegExp(source, 'i')
}

function isRegexp(val){
  return Object.prototype.toString.call(val) === '[object RegExp]'
}
