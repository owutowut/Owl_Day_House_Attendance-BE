'use strict'

const Leave = use('App/Models/Leave')

class UserLeaveController {
  async index ({ request, response }) {
    const { id, page, selected } =  request.body
    try {
      if ( selected ) {
        const leaves = await  Leave.query()
          .where('user_id', 'LIKE', `%${id}%`)
          .where('leave_type', 'LIKE', `%${selected}%`)
          .paginate(page, 5)

        return response.status(200).json({
          message: 'Leaves by selected User ID: '+id,
          leaves
        })
      }
      const leaves = await Leave.query().where('user_id', 'LIKE', `%${id}%`).paginate(page, 5)

      response.status(200).json({
        message: 'Leaves All User ID: '+id,
        leaves
      })
    } catch (error) {
      response.send(error.message)
    }
  }

  async store ({ request, response }) {
    const data = request.body

    try {
      const leave = await Leave.create(data)

      response.status(200).json({
        message: 'Successfully created.',
        data:leave
      })
    } catch (error) {
      response.send(error.message)
    }
  }
}

module.exports = UserLeaveController
