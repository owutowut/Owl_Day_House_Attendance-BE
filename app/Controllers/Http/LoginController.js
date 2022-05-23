'use strict'

const User = use('App/Models/User')
const jwt = use('jsonwebtoken')
const bcrypt = use('bcrypt')

class LoginController {
  async store ({ request, response }) {
    const { email, password } = request.all()
    const user = await User.query().where('email', email).first()

    try {
      if (bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({ id: user.id }, 'shhh')
        response.status(200).json({
          message : 'You have logged in successfully.',
          token, user
        })
      } else {
        response.status(200).json({
          message : 'Invalid email or password.',
          email
        })
      }
    } catch (error) {
      response.send(error)
    }
  }
}

module.exports = LoginController
