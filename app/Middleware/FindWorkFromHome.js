'use strict'

const WorkFromHome = use('App/Models/WorkFromHome')

class FindWorkFromHome {
  async handle({ request, response, params: { id } }, next) {
    const work_from_home = await WorkFromHome.find(id)

    if (!work_from_home) {
      return response.status(404).json({
        message: 'Leave not found.',
        id
      })
    }

    request.body.leave = work_from_home

    await next()
  }
}

module.exports = FindWorkFromHome
