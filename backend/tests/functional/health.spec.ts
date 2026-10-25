import { test } from '@japa/runner'

test.group('health', () => {
  test('GET /api/v1/health returns 200 with data.status ok', async ({ client }) => {
    const response = await client.get('/api/v1/health')

    response.assertStatus(200)
    response.assertBody({ data: { status: 'ok' } })
  })

  test('GET /api/v1/health is public', async ({ client }) => {
    const response = await client.get('/api/v1/health')

    response.assertStatus(200)
  })
})
