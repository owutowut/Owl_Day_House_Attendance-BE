'use strict'

const Leave = use('App/Models/Leave')

class FindLeave {
  async handle({ request, response, params: { id } }, next) {
    const leave = await Leave.find(id)

    if (!leave) {
      return response.status(404).json({
        message: 'Leave not found.',
        id
      })
    }

    request.body.leave = leave

    await next()
  }
}

module.exports = FindLeave
