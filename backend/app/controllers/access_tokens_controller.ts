import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'
import User from '#models/user'
import { loginValidator } from '#validators/user'

export default class AccessTokensController {
  async store({ request }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)

    const user = await User.verifyCredentials(email, password)
    user.lastLoginAt = DateTime.now()
    await user.save()
    const token = await User.accessTokens.create(user)

    return {
      data: {
        user: { id: user.id, email: user.email },
        accessToken: token.value!.release(),
      },
    }
  }
}
