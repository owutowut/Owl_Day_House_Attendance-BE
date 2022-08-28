'use strict'

const Holiday = use('App/Models/Holiday')

class FindHoliday {
  async handle({ request, response, params: { id } }, next) {
    const holiday = await Holiday.find(id)

    if (!holiday) {
      return response.status(404).json({
        message: 'Holiday not found.',
        id
      })
    }

    request.body.leave = holiday

    await next()
  }
}

module.exports = FindHoliday
