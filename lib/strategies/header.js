var headers = ['version', 'x-version', 'api-version', 'x-api-version']

module.exports = function header(req) {
  return headers
  .map(function (header) {
    return req.headers[header]
  })
  .filter(function (header) {
    return header != null
  })
  .shift() || null
}
