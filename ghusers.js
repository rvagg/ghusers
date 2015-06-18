const ghutils = require('ghutils')


module.exports.get = function get (auth, user, options, callback) {
  if (typeof options == 'function') {
    callback = options
    options  = {}
  }

  var url = 'https://api.github.com/users/' + user

  ghutils.ghget(auth, url, options, callback)
}
