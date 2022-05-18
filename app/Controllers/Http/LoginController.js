'use strict'

class LoginController {
  async store ({ request, auth, response }) {
    await auth.attempt(request.input('email'), request.input('password'))

    response.status(200).json({
      message : 'You have logged in successfully.'
    })
  }

  async destroy ({ auth, response }) {
    await auth.logout()

    response.status(200).json({
      message : 'You have logged out successfully.'
    })
  }
}

module.exports = LoginController
