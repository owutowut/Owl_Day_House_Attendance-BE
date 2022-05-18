'use strict'

const User = use('App/Models/User')

class UserController {
  async index ({ response }) {
    const user = await User.all()

    response.status(200).json({
      message: 'All User.',
      data: user
    })
  }

  async show({ response, params: { id } }) {
    const user = await User.findOrFail(id)

    response.status(200).json({
      message: 'User ID : ' + id,
      data: user
    })
  }

  async update({ request, response, params: { id } }) {
    const user = await User.findOrFail(id)
    const { first_name, last_name, email, password, role, position, tag, phone, birthday, report_to, address, state, country, pin_code } = request.post()

    user.first_name = first_name
    user.last_name = last_name
    user.email = email
    user.password = password
    user.role = role
    user.position = position
    user.tag = tag
    user.phone = phone
    user.birthday = birthday
    user.report_to = report_to
    user.address = address
    user.state = state
    user.country = country
    user.pin_code = pin_code

    await user.save()

    response.status(200).json({
      message: 'Successfully updated.',
      data: user
    })
  }

  async destroy ({ response, params: { id } }) {
    const user = await User.findOrFail(id)

    await user.delete()

    response.status(200).json({
      message: 'Successfully deleted.',
      data: user
    })
  }
}

module.exports = UserController
