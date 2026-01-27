import { test } from 'node:test'
import assert from 'node:assert'
import { createMockServer } from 'ghutils/test-util'
import * as ghusers from './ghusers.js'

test('get user', async () => {
  const auth = { token: 'test-token' }
  const testData = { login: 'testuser', id: 1, name: 'Test User' }

  const server = await createMockServer({ response: testData })
  try {
    const result = await ghusers.get(auth, 'testuser', {
      _apiUrl: server.baseUrl
    })
    assert.deepStrictEqual(result, testData)
    assert.ok(server.requests[0].url.includes('/users/testuser'))
    assert.strictEqual(server.requests[0].headers.authorization, 'Bearer test-token')
  } finally {
    await server.close()
  }
})

test('auth header is correctly set', async () => {
  const auth = { token: 'my-secret-token' }
  const testData = { login: 'testuser' }

  const server = await createMockServer({ response: testData })
  try {
    await ghusers.get(auth, 'testuser', { _apiUrl: server.baseUrl })
    assert.strictEqual(server.requests[0].headers.authorization, 'Bearer my-secret-token')
    assert.strictEqual(server.requests[0].headers.accept, 'application/vnd.github+json')
  } finally {
    await server.close()
  }
})
