'use strict'

const User = use('App/Models/User')
const Helpers = use('Helpers')

class UserController {
  async index ({ request, response }) {
    const {search, position, tag} = request.body

    try {
      if ( search ) {
        const user = await User.query()
          .where('first_name', 'LIKE', `%${search}%`)
          .fetch()

        return response.status(200).json({
          message: 'User by search.',
          user
        })
      }
      if ( position ) {
        const user = await User.query()
          .where('position', 'LIKE', `%${position}%`)
          .fetch()

        return response.status(200).json({
          message: 'User by position.',
          user
        })
      }
      if ( tag ) {
        const user = await User.query()
          .where('tag', 'LIKE', `%${tag}%`)
          .fetch()

        return response.status(200).json({
          message: 'User by status.',
          user
        })
      }

      const user = await User.all()

      response.status(200).json({
        message: 'All Users.',
        user,
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
    } catch (error) {
      response.send(error.message)
    }
  }

  async update({ request, response }) {
    const { id } = request.params
    const user = await User.findOrFail(id)
    const data = request.body
    const profile_img = request.file('profile_img', {
      types: ['image'],
      size: '2mb'
    })
    try {
      if (profile_img) {
        await profile_img.move(Helpers.publicPath('uploads'),
          {
            name: `${user.id}.jpg`,
            overwrite: true
          })

        if (!profile_img.moved()) {
          return profile_img.error()
        }
        user.profile_img = `https://${process.env.HOST}:${process.env.PORT}/uploads/${profile_img.fileName}`
      }

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
    } catch (e) {
      response.send(e.message)
    }
  }

  async destroy ({ request, response }) {
    const { id } = request.params
    const user = await User.findOrFail(id)

    user.delete(user)

    response.status(200).json({
      message: 'Successfully deleted.',
      data: user
    })
  }

  async getProfile ({ auth, request, response }) {
    const token = request.header('Authorization')
    try {
      if (token) {
        const user = await auth.getUser()
        return response.send(user);
      } else {
        return response.send('Invalid Token!')
      }
    } catch (e) {
      response.send('Invalid Token!')
    }
  }
}

module.exports = UserController
