'use strict'

const User = use('App/Models/User')
const Hash = use('Hash')
const jwt = use('jsonwebtoken')

class LoginController {
  async store ({ request, response }) {
    const { email, password } = request.body

    const user = await User.query()
      .where('email', email)
      .first()

    const invalid = 'Invalid Email or Password.'

    if (!user) {
      return response.status(200).json({invalid})
    }

    // const token = await auth.attempt(email, password)
    const verify = await Hash.verify(password, user.password)

    try {
      if (verify) {
        const token = jwt.sign({ id: user.id }, process.env.TOKEN_KEY)

        response.status(200).json({
          message: 'Logged in successfully.',
          token, user
        })
      } else {
        return response.status(200).json({invalid})
      }
    } catch (error) {
      console.log(error.message)
    }
  }
}

module.exports = LoginController
