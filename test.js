const ghutils = require('ghutils/test')
    , http    = require('http')
    , test    = require('tape')
    , xtend   = require('xtend')
    , ghusers = require('./')


test('test get user', function (t) {
  t.plan(7)

  var auth     = { user: 'authuser', token: 'authtoken' }
    , username = 'testuser'
    , testData = { login: username, test: 'data' }
    , server

  server = ghutils.makeServer(testData)
    .on('ready', function () {
      ghusers.get(xtend(auth), username, ghutils.verifyData(t, testData))
    })
    .on('request', ghutils.verifyRequest(t, auth))
    .on('get', ghutils.verifyUrl(t, [
        'https://api.github.com/users/' + username
    ]))
    .on('close'  , ghutils.verifyClose(t))
})
