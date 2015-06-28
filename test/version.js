var http = require('http')
var request = require('supertest')
var version = require('..')

suite('version(version, server)', function () {
  test('route by header version', function (done) {
    var vhosts = []

    vhosts.push(version('1.0', tobi))
    vhosts.push(version('2.0', loki))

    var app = createServer(vhosts)

    function tobi(req, res) { res.end('1.0') }
    function loki(req, res) { res.end('2.0') }

    request(app)
    .get('/')
    .set('Version', '1.0')
    .expect(200, '1.0', end)

    request(app)
    .get('/')
    .set('X-Version', '2.0')
    .expect(200, '2.0', end)

    var finished = false
    function end() {
      if (finished) return done()
      finished = true
    }
  })

  test('route by accept version', function (done) {
    var vhosts = []
    vhosts.push(version('1.0', tobi))
    function tobi(req, res) { res.end('1.0') }

    var app = createServer(vhosts)

    request(app)
    .get('/')
    .set('Accept', 'application/json; version=1.0')
    .expect(200, '1.0', done)
  })

  test('route by path version', function (done) {
    var vhosts = []
    vhosts.push(version('2.0', loki))
    function loki(req, res) { res.end('2.0') }

    var app = createServer(vhosts)

    request(app)
    .get('/2.0/test')
    .expect(200, '2.0', done)
  })

})

function createServer(versions, server) {
  var vhosts = !Array.isArray(versions)
    ? [version(versions, server)]
    : versions

  return http.createServer(function onRequest(req, res) {
    var index = 0

    function next(err) {
      var version = vhosts[index++]

      if (!version || err) {
        res.statusCode = err ? (err.status || 500) : 404
        res.end(err ? err.message : 'oops')
        return
      }

      version(req, res, next)
    }

    next()
  })
}
