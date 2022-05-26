'use strict'

const Holiday = use('App/Models/Holiday')

class HolidayController {
  async index ({ request, response }) {
    const {page, search} = request.all()

    try {
      if ( search ) {
        const holiday = await Holiday.query()
          .where('name', 'LIKE', `%${search}%`)
          .paginate(page, 5)
        return response.status(200).json({
          message: 'All Holiday.',
          data: holiday
        })
      }
      const holiday = await Holiday.query().paginate(page, 5)


      response.status(200).json({
        message: 'All Holiday.',
        data: holiday
      })
    } catch (error) {
      response.send(error)
    }
  }

  async store ({ request, response }) {
    const { name, from, to, no_of_days } = request.post()

    try {
      const holiday = await Holiday.create({ name, from, to, no_of_days })

      response.status(200).json({
        message: 'Successfully created.',
        data: holiday
      })
    } catch (error) {
      response.send(error)
    }
  }

  async show({ response, params: { id } }) {
    try {
      const holiday = await Holiday.findOrFail(id)

      response.status(200).json({
        message: 'Holiday ID : ' + id,
        data: holiday
      })
    } catch (error) {
      response.send(error)
    }
  }

  async update({ request, response, params: { id } }) {
    const { name, from, to, no_of_days } = request.post()

    try {
      const holiday = await Holiday.findOrFail(id)

      holiday.name = name
      holiday.from = from
      holiday.to = to
      holiday.no_of_days = no_of_days

      holiday.save(id)

      response.status(200).json({
        message: 'Successfully updated.',
        data: holiday
      })
    } catch (error) {
      response.send(error)
    }
  }

  async destroy ({ response, params: { id } }) {
    try {
      const holiday = await Holiday.findOrFail(id)
      holiday.delete(id)

      response.status(200).json({
        message: 'Successfully deleted.',
        data: holiday
      })
    } catch (error) {
      response.send(error)
    }
  }
}

module.exports = HolidayController
