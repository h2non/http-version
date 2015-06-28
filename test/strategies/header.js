var expect = require('chai').expect
var header = require('../../lib/strategies/header')

suite('header', function () {
  test('match', function () {
    var cases = [
      { header: 'version', value: '1.0', expect: '1.0' },
      { header: 'x-version', value: '1.0', expect: '1.0' },
      { header: 'api-version', value: '1.0', expect: '1.0' },
      { header: 'x-api-version', value: '1.0', expect: '1.0' },
      { header: 'server-version', value: '1.0', expect: null },
      { header: 'invalid', value: '', expect: null },
      { header: 'empty', value: '', expect: null },
    ]

    cases.forEach(function (test) {
      var headers = {}
      headers[test.header] = test.value
      var req = { headers: headers }
      expect(header(req)).to.be.equal(test.expect)
    })
  })
})
