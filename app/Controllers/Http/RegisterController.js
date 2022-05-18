'use strict'

const User = use('App/Models/User')

class RegisterController {
  async store ({ request, response }) {
    const { first_name , last_name , email , password , role , position , tag, phone, birthday, report_to, address, state, country, pin_code } = request.post()

    const user = await User.create(
      { first_name , last_name , email , password , role , position , tag, phone, birthday, report_to, address, state, country, pin_code })

    response.status(200).json({
      message: 'Successfully registered.',
      data:user
    })
  }
}

module.exports = RegisterController
