# http-version [![Build Status](https://api.travis-ci.org/h2non/http-version.svg?branch=master&style=flat)](https://travis-ci.org/h2non/http-version) [![NPM](https://img.shields.io/npm/v/http-version.svg)](https://www.npmjs.org/package/http-version)

HTTP API version matching middleware compatible with [connect](https://github.com/senchalabs/connect)/[express](https://github.com/strongloop/express).
It supports multiple [versioning strategies](#versioning-strategies).

Inspired by [vhost](https://github.com/express/vhost) middleware

## Installation

```bash
npm install http-version --save
```

## Versioning strategies

Versioning strategies are defined by match order priority

For information about different HTTP APIs version strategies, see [http-api-versioning](https://github.com/h2non/http-api-versioning)

#### Header

```
GET /resource HTTP/1.1
Version: 1.0
```

#### Accept version

```
GET /resource HTTP/1.1
Accept: application/json; version=1.0
```

#### Path

```
GET /v1.0/resource HTTP/1.1
```

## Usage

```js
var express = require('express')
var version = require('http-version')

// Create express apps
var oldAPI = express()
var newAPI = express()

oldAPI.get('/test', testHandler)
newAPI.get('/test', testHandler)

function testHandler(req, res) {
  res.end('Processing request from API version: ' + req.version)
}

// Create the main app
var app = express()

// Attach the version middlewares per each app
app.use(version('1.0', oldAPI))
app.use(version('2.0', newAPI))

// Start server
app.listen(3000)
```

## API

#### version(version, [ strategies ], handle) `=>` Function(req, res, next)

#### version.strategies `=>` Array[Function]

## License

MIT - Tomas Aparicio
