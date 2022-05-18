'use strict'

const User = use('App/Models/User')

class LoginController {
  async store ({ request, auth, response }) {
    try {
      await auth.attempt(request.input('email'), request.input('password'))
      const data = request.all()
      const query = await User.query()
        .where('email',data.email)
        .first()

      response.status(200).json({
        message : 'You have logged in successfully.',
        query
      })
    } catch (error) {
      response.send(error.message)
    }
  }

  async destroy ({ auth, response }) {
    try {
      await auth.logout()
      response.status(200).json({
        message : 'You have logged out successfully.',
      })
    } catch (error) {
      response.send('You are not logged in')
    }
  }
}

module.exports = LoginController
