/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { controllers } from '#generated/controllers'
import { middleware } from '#start/kernel'

router.post('signup', [controllers.NewAccount, 'store'])
router.post('login', [controllers.AccessTokens, 'store'])
router.get('me', [controllers.Profile, 'show']).use(middleware.auth())

router
  .group(() => {
    router.get('health', [controllers.Health, 'show'])
  })
  .prefix('api/v1')
