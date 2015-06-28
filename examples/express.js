var express = require('express')
var request = require('supertest')
var version = require('..')

// Create express apps
var oldAPI = express()
oldAPI.get('/test', function (req, res) {
  res.send('Hello world from old API')
})

var newAPI = express()
newAPI.get('/test', function (req, res) {
  res.send('Hello world from new API')
})

// Create the main app
var app = express()

// Attach the version middlewares per each app
app.use(version('1.0', oldAPI))
app.use(version('2.0', newAPI))

// Start server
app.listen(3000)

// Test requests
request('http://localhost:3000')
  .get('/test')
  .set('Version', '1.0')
  .expect(200, 'Hello world from old API')
  .end(function (err) {
    if (err) {
      return console.error('Oops:', err)
    }
    console.log('Old API server success')
  })

request('http://localhost:3000')
  .get('/test')
  .set('Version', '2.0')
  .expect(200, 'Hello world from new API')
  .end(function (err) {
    if (err) {
      return console.error('Oops:', err)
    }
    console.log('New API server success')
  })
