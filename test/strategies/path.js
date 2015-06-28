var expect = require('chai').expect
var path = require('../../lib/strategies/path')

suite('path', function () {
  test('match', function () {
    var cases = [
      { url: '/v1.0', expect: '1.0' },
      { url: '/v2.0', expect: '2.0' },
      { url: '/2.0',  expect: '2.0' },
      { url: '/1', expect: '1' },
      { url: '/1.0/users', expect: '1.0' },
      { url: '/1/users', expect: '1' },
      { url: '/users', expect: null },
      { url: '/', expect: null },
      { url: '/users/v1.0', expect: null },
    ]

    cases.forEach(function (test) {
      var req = { url: test.url }
      expect(path(req)).to.be.equal(test.expect)
    })
  })
})
