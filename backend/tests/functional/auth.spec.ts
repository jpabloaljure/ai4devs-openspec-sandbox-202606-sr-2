import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'
import { DateTime } from 'luxon'
import User from '#models/user'

test.group('auth', (group) => {
  group.each.setup(() => testUtils.db().truncate())

  test('signup returns 201 with user and an oat_ accessToken', async ({ client, assert }) => {
    const response = await client
      .post('/signup')
      .json({ email: 'a@example.com', password: 'password123' })

    response.assertStatus(201)
    const { data } = response.body()
    assert.properties(data, ['user', 'accessToken'])
    assert.match(data.accessToken, /^oat_/)
    assert.properties(data.user, ['id', 'email'])
    assert.equal(data.user.email, 'a@example.com')
    assert.notProperty(data.user, 'password')
  })

  test('signup rejects passwords shorter than 8 chars', async ({ client }) => {
    const response = await client
      .post('/signup')
      .json({ email: 'a@example.com', password: 'short' })

    response.assertStatus(422)
    response.assertBodyContains({ error: { code: 'E_VALIDATION_ERROR' } })
  })

  test('login returns 200 with user and a fresh accessToken', async ({ client, assert }) => {
    const signup = await client
      .post('/signup')
      .json({ email: 'a@example.com', password: 'password123' })

    const response = await client
      .post('/login')
      .json({ email: 'a@example.com', password: 'password123' })

    response.assertStatus(200)
    const { data } = response.body()
    assert.equal(data.user.email, 'a@example.com')
    assert.notEqual(data.accessToken, signup.body().data.accessToken)
  })

  test('login rejects wrong password', async ({ client }) => {
    await client.post('/signup').json({ email: 'a@example.com', password: 'password123' })

    const response = await client
      .post('/login')
      .json({ email: 'a@example.com', password: 'wrong-password' })

    response.assertStatus(400)
    response.assertBodyContains({ error: { code: 'E_INVALID_CREDENTIALS' } })
  })

  test('GET /me for a never-logged-in user returns null displayName and lastLoginAt', async ({
    client,
    assert,
  }) => {
    const signup = await client
      .post('/signup')
      .json({ email: 'a@example.com', password: 'password123' })

    const response = await client
      .get('/me')
      .header('Authorization', `Bearer ${signup.body().data.accessToken}`)

    response.assertStatus(200)
    const { data } = response.body()
    assert.deepEqual(Object.keys(data).sort(), [
      'createdAt',
      'displayName',
      'email',
      'id',
      'lastLoginAt',
    ])
    assert.equal(data.email, 'a@example.com')
    assert.isNull(data.displayName)
    assert.isNull(data.lastLoginAt)
  })

  test('GET /me returns displayName and the last successful login time', async ({
    client,
    assert,
  }) => {
    await client.post('/signup').json({ email: 'a@example.com', password: 'password123' })
    await User.query().where('email', 'a@example.com').update({ display_name: 'Ada' })

    const before = Date.now()
    const login = await client
      .post('/login')
      .json({ email: 'a@example.com', password: 'password123' })

    const response = await client
      .get('/me')
      .header('Authorization', `Bearer ${login.body().data.accessToken}`)

    response.assertStatus(200)
    const { data } = response.body()
    assert.equal(data.displayName, 'Ada')
    assert.isAtLeast(DateTime.fromISO(data.lastLoginAt as string).toMillis(), before - 1000)
  })

  test('failed login does not update lastLoginAt', async ({ client, assert }) => {
    await client.post('/signup').json({ email: 'a@example.com', password: 'password123' })
    await client.post('/login').json({ email: 'a@example.com', password: 'wrong-password' })

    const user = await User.findByOrFail('email', 'a@example.com')
    assert.isNull(user.lastLoginAt)
  })

  test('GET /me without a token returns 401', async ({ client }) => {
    const response = await client.get('/me')
    response.assertStatus(401)
    response.assertBodyContains({ error: { code: 'E_UNAUTHORIZED_ACCESS' } })
  })
})
