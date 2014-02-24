# ghusers

[![Build Status](https://secure.travis-ci.org/rvagg/ghusers.png)](http://travis-ci.org/rvagg/ghusers)

**A node library to interact with the GitHub users API**

[![NPM](https://nodei.co/npm/ghusers.png?mini=true)](https://nodei.co/npm/ghusers/)

## Example usage

```js
const ghusers     = require('ghusers')
    , authOptions = { user: 'rvagg', token: '24d5dee258c64aef38a66c0c5eca459c379901c2' }

// get user by login/username
ghusers.get(authOptions, 'substack', function (err, user) {
  // object containing full details of @substack
  console.log(user)
})
```


The auth data is compatible with [ghauth](https://github.com/rvagg/ghauth) so you can just connect them together to make a simple command-line application:

```js
const ghauth      = require('ghauth')
    , ghusers     = require('ghusers')
    , authOptions = {
          configName : 'team-lister'
        , scopes     : [ 'user' ]
      }

ghauth(authOptions, function (err, authData) {
  ghusers.get(authData, 'rvagg', function (err, user) {
    console.log(user)
  })
})
```


## License

**ghusers** is Copyright (c) 2014 Rod Vagg [@rvagg](https://github.com/rvagg) and licensed under the MIT licence. All rights not explicitly granted in the MIT license are reserved. See the included LICENSE file for more details.
