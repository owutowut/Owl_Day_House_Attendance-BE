'use strict'

const Leave = use('App/Models/Leave')

class LeaveController {
  async index ({ request, response }) {
    const {page} = request.all()

    try {
      const leaves = await Leave.query().paginate(page, 5)

      response.status(200).json({
        message: 'All Leave.',
        data: leaves
      })
    } catch (error) {
      response.send(error)
    }
  }

  async store ({ request, response }) {
    const data = request.all()

    const leave = await Leave.create(data)

    response.status(200).json({
      message: 'Successfully created.',
      data:leave
    })
  }

  async show({ response, params: { id } }) {
    const leave = await Leave.findOrFail(id)

    response.status(200).json({
      message: 'Leave ID : ' + id,
      data: leave
    })
  }

  async update({ request, response, params: { id } }) {
    const { name, leave_type, from, to, no_of_days, tag, status } = request.post()
    const leave = await Leave.findOrFail(id)

    leave.name = name
    leave.leave_type = leave_type
    leave.from = from
    leave.to = to
    leave.no_of_days = no_of_days
    leave.tag = tag
    leave.status = status

    leave.save(id)

    response.status(200).json({
      message: 'Successfully updated.',
      data: leave
    })
  }

  async destroy ({ response, params: { id } }) {
    const leave = await Leave.findOrFail(id)

    leave.delete(leave)

    response.status(200).json({
      message: 'Successfully deleted.',
      data: leave
    })
  }
}

module.exports = LeaveController
