'use strict'

const Leave = use('App/Models/Leave')

class LeaveController {
  async index ({ response }) {
    const leave= await Leave.all()

    response.status(200).json({
      message: 'All Leave.',
      data: leave
    })
  }

  async store ({ request, response }) {
    const { name, leave_type, from, to, no_of_days, tag, status } = request.post()

    const leave = await Leave.create({ name, leave_type, from, to, no_of_days, tag, status })

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
    const leave = await Leave.findOrFail(id)
    const { name, leave_type, from, to, no_of_days, tag, status } = request.post()

    leave.name = name
    leave.leave_type = leave_type
    leave.from = from
    leave.to = to
    leave.no_of_days = no_of_days
    leave.tag = tag
    leave.status = status

    await leave.save()

    response.status(200).json({
      message: 'Successfully updated.',
      data: leave
    })
  }

  async destroy ({ response, params: { id } }) {
    const leave = await Leave.findOrFail(id)

    await leave.delete()

    response.status(200).json({
      message: 'Successfully deleted.',
      data: leave
    })
  }
}

module.exports = LeaveController
