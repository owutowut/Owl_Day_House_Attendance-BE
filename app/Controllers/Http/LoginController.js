'use strict'

const User = use('App/Models/User')
const jwt = use('jsonwebtoken')
const Hash = use('Hash')

class LoginController {
  async store ({ request, response }) {

    const { email, password } = request.body

    const user = await User.query()
      .where('email', email)
      .first()

    if (!user) {
      response.send('Email not found.')
    } else {

      const verify = await Hash.verify(password, user.password)

      try {
        if (verify) {
          const token = jwt.sign(
            {user},
            process.env.TOKEN_KEY,
            {expiresIn: "2h"}
          )
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
}

module.exports = LoginController
