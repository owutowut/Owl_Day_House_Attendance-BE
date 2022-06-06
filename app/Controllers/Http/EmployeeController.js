'use strict'
const User = use('App/Models/User')

class EmployeeController {
  async index ({ request, response }) {
    const { search, position, status } = request.body

    try {
      if ( search ) {
        const users = await User.query().where('first_name', 'LIKE', `%${search}%`)

        return response.status(200).json({
          message: 'Users by search: '+search,
          data: users
        })
      }
      if ( position ) {
        const users = await User.query().where('created_at', 'LIKE', `%${position}%`)

        return response.status(200).json({
          message: 'Users by selected: '+position,
          data: users
        })
      }
      if ( status ) {
        const users = await User.query().where('created_at', 'LIKE', `%${status}%`)

        return response.status(200).json({
          message: 'Users by selected: '+status,
          data: users
        })
      }

      const users = await User.all

      response.status(200).json({
        message: 'All User',
        data: users
      })
    }

    catch (error) {
      response.send(error.message)
    }
  }
}

module.exports = EmployeeController
