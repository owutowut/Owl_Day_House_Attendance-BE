'use strict'

const User = use('App/Models/User')

class LoginController {
  async store ({ request, response, auth }) {
    const { email, password } = request.body

    const user = await User.query()
      .where('email', email)
      .first()

    if (!user) {
      return response.send('Email not found.')
    }

    const token = await auth.attempt(email, password)

    try {
      if (token) {
        response.status(200).json({
          message: 'Logged in successfully.',
          token, user
        })
      } else {
        response.send('Invalid password.')
      }
    } catch (error) {
      console.log(error.message)
    }
  }
}

module.exports = LoginController
