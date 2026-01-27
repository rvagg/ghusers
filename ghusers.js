import { ghget } from 'ghutils'

const defaultApiUrl = 'https://api.github.com'

export async function get (auth, user, options = {}) {
  const apiUrl = options._apiUrl || defaultApiUrl
  const url = `${apiUrl}/users/${user}`
  const { data } = await ghget(auth, url, options)
  return data
}
