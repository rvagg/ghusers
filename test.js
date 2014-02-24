const http           = require('http')
    , test           = require('tape')
    , requireSubvert = require('require-subvert')(__dirname)
    , _hyperquest    = require('hyperquest')
    , xtend          = require('xtend')
    , EE             = require('events').EventEmitter
    , bl             = require('bl')


requireSubvert.subvert('hyperquest', hyperquest)

var ghusers = require('./')
  , hyperget

function hyperquest () {
  return hyperget.apply(this, arguments)
}


function makeServer (data) {
  var ee     = new EE()
    , i      = 0
    , server = http.createServer(function (req, res) {
        ee.emit('request', req)

        var _data = Array.isArray(data) ? data[i++] : data
        res.end(JSON.stringify(_data))

        if (!Array.isArray(data) || i == data.length)
          server.close()
      })
      .listen(0, function (err) {
        if (err)
          return ee.emit('error', err)

        hyperget = function (url, opts) {
          ee.emit('get', url, opts)
          return _hyperquest('http://localhost:' + server.address().port, opts)
        }

        ee.emit('ready')
      })
      .on('close', ee.emit.bind(ee, 'close'))

  return ee
}


function toAuth (auth) {
  return 'Basic ' + (new Buffer(auth.user + ':' + auth.token).toString('base64'))
}


function verifyRequest (t, auth) {
  return function (req) {
    t.ok(true, 'got request')
    t.equal(req.headers['authorization'], toAuth(auth), 'got auth header')
  }
}


function verifyUrl (t, urls) {
  var i = 0
  return function (_url) {
    if (i == urls.length)
      return t.fail('too many urls/requests')
    t.equal(_url, urls[i++], 'correct url')
  }
}


function verifyClose (t) {
  return function () {
    t.ok(true, 'got close')
  }
}


function verifyData (t, data) {
  return function (err, _data) {
    t.notOk(err, 'no error')
    t.ok((data === '' && _data === '') || _data, 'got data')
    t.deepEqual(_data, data, 'got expected data')
  }
}


test('test get user', function (t) {
  t.plan(7)

  var auth     = { user: 'authuser', token: 'authtoken' }
    , username = 'testuser'
    , testData = { login: username, test: 'data' }
    , server

  server = makeServer(testData)
    .on('ready', function () {
      ghusers.get(xtend(auth), username, verifyData(t, testData))
    })
    .on('request', verifyRequest(t, auth))
    .on('get', verifyUrl(t, [
        'https://api.github.com/users/' + username
    ]))
    .on('close'  , verifyClose(t))
})
