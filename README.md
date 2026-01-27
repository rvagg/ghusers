# ghusers

**A Node.js library to interact with the GitHub users API**

[![NPM](https://nodei.co/npm/ghusers.svg?style=flat&data=n,v&color=blue)](https://nodei.co/npm/ghusers/)

## Requirements

- Node.js >= 20

## Example usage

```js
import * as ghusers from 'ghusers'

const auth = { token: 'your-github-token' }

// get user by login/username
const user = await ghusers.get(auth, 'substack')
console.log(user)
```

The auth data is compatible with [ghauth](https://github.com/rvagg/ghauth) so you can connect them together:

```js
import ghauth from 'ghauth'
import * as ghusers from 'ghusers'

const auth = await ghauth({
  configName: 'user-lookup',
  scopes: ['user']
})

const user = await ghusers.get(auth, 'rvagg')
console.log(user)
```

## API

All methods return Promises.

### ghusers.get(auth, user, options)

Get full user data for a given login/username.

## Authentication

See [ghauth](https://github.com/rvagg/ghauth) for an easy way to obtain and cache GitHub authentication tokens. The `auth` object returned by ghauth is directly compatible with all ghusers methods.

## See also

* [ghissues](https://github.com/rvagg/ghissues) - interact with the GitHub issues API
* [ghpulls](https://github.com/rvagg/ghpulls) - interact with the GitHub pull requests API
* [ghteams](https://github.com/rvagg/ghteams) - interact with the GitHub teams API
* [ghrepos](https://github.com/rvagg/ghrepos) - interact with the GitHub repos API
* [ghauth](https://github.com/rvagg/ghauth) - GitHub authentication

## License

**ghusers** is Copyright (c) 2014-2025 Rod Vagg [@rvagg](https://github.com/rvagg) and licensed under the MIT licence. All rights not explicitly granted in the MIT license are reserved. See the included LICENSE file for more details.
