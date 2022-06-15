'use strict'

const User = use('App/Models/User')
const Hash = use('Hash')
const jwt = use('jsonwebtoken')


class LoginController {
  async store ({ request, response, auth }) {
    const { email, password } = request.body

    const user = await User.query()
      .where('email', email)
      .first()

    if (!user) {
      return response.send('Invalid Email or Password.')
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
        response.send('Invalid Email or Password.')
      }
    } catch (error) {
      console.log(error.message)
    }
  }
}

module.exports = LoginController
