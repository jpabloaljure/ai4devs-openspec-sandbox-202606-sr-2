import vine from '@vinejs/vine'

/**
 * Shared rules for email.
 */
const email = () => vine.string().email().maxLength(254)

/**
 * Validator to use when performing self-signup
 */
export const signupValidator = vine.create({
  email: email().unique({ table: 'users', column: 'email' }),
  password: vine.string().minLength(8).maxLength(32),
})

/**
 * Validator to use before validating user credentials
 * during login
 */
export const loginValidator = vine.create({
  email: email(),
  password: vine.string(),
})
