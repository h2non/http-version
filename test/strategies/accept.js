var expect = require('chai').expect
var accept = require('../../lib/strategies/accept')

suite('accept', function () {
  test('match', function () {
    var cases = [
      { value: 'application/json; version=1.0', expect: '1.0' },
      { value: 'application/vnd.heroku+json; version=1', expect: '1' },
      { value: 'test/plain; version=1', expect: '1' },
      { value: 'audio/mp3; q=0.2; version=1', expect: '1' },
      { value: 'text/*;q=0.3, text/html;q=0.7, text/html;level=1;version=1', expect: '1' },
      { value: 'text/plain; version=1.0; encoding=utf8', expect: '1.0' },
      { value: ';version=1', expect: '1' },
      { value: 'version=1', expect: null },
      { value: 'application/json', expect: null },
      { value: 'application/json; q=0.2', expect: null },
      { value: '', expect: null },
    ]

    cases.forEach(function (test) {
      var req = { headers: { accept: test.value } }
      expect(accept(req)).to.be.equal(test.expect)
    })
  })
})
