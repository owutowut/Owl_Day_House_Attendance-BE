'use strict'

const Holiday = use('App/Models/Holiday')

class HolidayController {
  async index ({ request, response }) {
    const { page, search, selected } = request.all

    try {
      if (search) {
        const holidays = await Holiday.query().where('name', 'LIKE', `%${search}%`).paginate(page, 5)

        response.status(200).json({
          message: 'Holiday by search.',
          data: holidays , selected, page
        })
      }

      if (selected) {
        const holidays = await Holiday.query().where('created_at', 'LIKE', `%${selected}%`).paginate(page, 5)

        response.status(200).json({
          message: 'Holiday by selected.',
          data: holidays , selected, page
        })
      }

      const holidays = await Holiday.query().paginate(page, 5)

      response.status(200).json({
        message: 'All Holiday.',
        data: holidays , selected, page
      })
    } catch (error) {
      response.send(error.message)
    }
  }

  async store ({ request, response }) {
    const data = request.body

    try {
      const holidays = await Holiday.create(data)

      response.status(200).json({
        message: 'Successfully created.',
        holidays
      })
    } catch (error) {
      response.send(error.message)
    }
  }

  async show({ request, response }) {
    const { id } = request.params

    try {
      const holidays = await Holiday.findOrFail(id)

      response.status(200).json({
        message: 'Holiday ID : ' + id,
        holidays
      })
    } catch (error) {
      response.send(error.message)
    }
  }

  async update({ request, response }) {
    const data = request.body

    try {
      const holidays = await Holiday.findOrFail(data.id)

      holidays.name = data.name
      holidays.from = data.from
      holidays.to = data.to
      holidays.no_of_days = data.no_of_days

      holidays.save(holidays)

      response.status(200).json({
        message: 'Successfully updated.',
        holidays
      })
    } catch (error) {
      response.send(error.message)
    }
  }

  async destroy ({ request, response }) {
    const { id } = request.params

    try {
      const holidays = await Holiday.findOrFail(id)
      holidays.delete(id)

      response.status(200).json({
        message: 'Successfully deleted.',
        holidays
      })
    } catch (error) {
      response.send(error.message)
    }
  }
}

module.exports = HolidayController
