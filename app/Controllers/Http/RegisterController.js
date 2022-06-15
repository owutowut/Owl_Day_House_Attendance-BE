'use strict'

const User = use('App/Models/User')
const Helpers = use('Helpers')

class RegisterController {
  async store ({ request, response }) {
    const data = request.body
    console.log(data)
    const findUser = await User.query().where('email', data.email).first()
    const profile_img = request.file('profile_img', {
      types: ['image'],
      size: '2mb'
    })

    try {
      if (findUser) {

        return response.send('Your email is used.')
      } else {
        const user = await User.create(data)

        if (profile_img) {
          await profile_img.move(Helpers.publicPath('uploads'),
              {
                name: `${user.id}.jpg`,
                overwrite: true
              })
          if (!profile_img.moved()) {

            return profile_img.error()
          } else {
            user.profile_img  = `http://${process.env.HOST}:${process.env.PORT}/uploads/${profile_img.fileName}`
            return user.save(user)
          }
        }

        return response.status(200).json({
          message: 'Registered successfully.',
          user
        })
      }
    } catch (error) {
      response.send(error.message)
    }
  }
}

module.exports = RegisterController
