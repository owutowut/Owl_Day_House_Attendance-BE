'use strict'
const User = use('App/Models/User')
const Mail = use('Mail')
const jwt = use('jsonwebtoken')

class ForgotPasswordController {
  async index ({ request, response }) {
    try {
      const { email } = request.body
      const user = await User.query()
        .where('email', email)
        .first()

      if (!user) {
        return response.send('Email not found.')
      }

      const token = jwt.sign({ id: user.id }, process.env.TOKEN_KEY)
      const url = 'http://localhost:3000/forgot_password/'+token

      await Mail.send('emails.forgot_password',{ user,url }, (message) => {
        message
            .from('do-not-reply@owldayhouse.com','Owl Day House')
            .to(user.email)
            .subject('Account Password Reset.')
        })

      response.status(200).json({
        message: 'Please check your email : '+user.email,
      })
    } catch (e) {
      response.send(e)
    }
  }

  async update({ request, response }) {
    const { token } = request.params
    const { new_password }= request.body
    try{
      const data = jwt.verify(token,process.env.TOKEN_KEY)
      if (!data) {
        return response.send('Invalid Token!')
      }
      const user = await User.findOrFail(data.id)
      if (!user) {
        return response.send('User not found.')
      }
      user.password = new_password
      user.save()

      response.status(200).json({
        message: 'Successfully updated.',
      })
    } catch (e) {
      response.send(e)
    }
  }
}

module.exports = ForgotPasswordController
