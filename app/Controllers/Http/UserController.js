'use strict'

const User = use('App/Models/User')
const jwt = use('jsonwebtoken')

class UserController {
  async index ({ request, response }) {
    const {search, position, status} = request.body

    try {
      if ( search ) {
        const user = await User.query()
          .where('name', 'LIKE', `%${search}%`)
          .fetch()

        return response.status(200).json({
          message: 'User by search.',
          user
        })
      }
      if ( position ) {
        const user = await User.query()
          .where('tag', 'LIKE', `%${position}%`)
          .fetch()

        return response.status(200).json({
          message: 'User by position.',
          user
        })
      }
      if ( status ) {
        const user = await User.query()
          .where('status', 'LIKE', `%${status}%`)
          .fetch()

        return response.status(200).json({
          message: 'User by status.',
          user
        })
      }

      const user = await User.all()

      response.status(200).json({
        message: 'All Users.',
        user
      })
    } catch (error) {
      response.send(error.message)
    }
  }

  async show({ request, response }) {
    const { id } = request.params

    try {
      const user = await User.findOrFail(id)

      response.send(user)
    }catch (error) {
      response.send(error.message)
    }
  }

  async profile({ request, response }) {
    const token = request.headers.authorization.split(' ')[1];

    try {
      if(!token) {
        response.send('Invalid Token!')
      } else{
        const data = jwt.verify(token,process.env.TOKEN_KEY)

        const user = await User.findById(data.id)
        response.send(user)
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  async update({ request, response }) {
    const { id } = request.params

    const user = await User.findOrFail(id)
    const data = request.body

    user.first_name = data.first_name
    user.last_name = data.last_name
    user.email = data.email
    user.password = data.password
    user.role = data.role
    user.position = data.position
    user.tag = data.tag
    user.phone = data.phone
    user.birthday = data.birthday
    user.report_to = data.report_to
    user.address = data.address
    user.state = data.state
    user.country = data.country
    user.pin_code = data.pin_code
    user.gender = data.gender

    user.save(user)

    response.status(200).json({
      message: 'Successfully updated.',
      data: user
    })
  }

  async destroy ({ response, params: { id } }) {
    const user = await User.findOrFail(id)

    user.delete(user)

    response.status(200).json({
      message: 'Successfully deleted.',
      data: user
    })
  }
}

module.exports = UserController
