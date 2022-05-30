'use strict'

const jwt = use('jsonwebtoken')
const User = use('App/Models/User')

class RegisterController {
  async store ({ request, response }) {
    const data = request.body
    const {email} = request.body

    const findUser = await User.query()
      .where('email', email)
      .first()

    if (findUser) {
        response.send('Your email is used.')
    } else {

      const user = await User.create(data)

      try {
        const token = jwt.sign(
          {user},
          process.env.TOKEN_KEY,
          {expiresIn: "2h"}
        )
        response.status(200).json({
          message: 'Registered successfully.',
          token, user
        })
      } catch (error) {
        response.send(error.message)
      }
    }
  }
}

module.exports = RegisterController
