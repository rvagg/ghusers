const jsonist = require('jsonist')
    , qs      = require('querystring')
    , xtend   = require('xtend')


function makeOptions (auth, options) {
  return xtend({
      headers : { 'User-Agent' : 'Magic Node.js application that does magic things' }
    , auth    : auth.user + ':' + auth.token
  }, options)
}


function handler (callback) {
  return function responseHandler (err, data) {
    if (err)
      return callback(err)

    if (data.error || data.message)
      return callback(new Error('Error from GitHub: ' + (data.error || data.message)))

    callback(null, data)
  }
}


function ghget (auth, url, options, callback) {
  options = makeOptions(auth, options)

  jsonist.get(url, options, handler(callback))
}


module.exports.get = function get (auth, user, options, callback) {
  if (typeof options == 'function') {
    callback = options
    options  = {}
  }

  var url = 'https://api.github.com/users/' + user

  ghget(auth, url, options, callback)
}
