'use strict'

const Holiday = use('App/Models/Holiday')

class HolidayController {
  async index ({ response }) {
    const holiday= await Holiday.all()

    response.status(200).json({
      message: 'All Holiday.',
      data: holiday
    })
  }

  async store ({ request, response }) {
    const { name, from, to, no_of_days } = request.post()

    const holiday = await Holiday.create({ name, from, to, no_of_days })

    response.status(200).json({
      message: 'Successfully created.',
      data:holiday
    })
  }

  async show({ response, params: { id } }) {
    const holiday = await Holiday.findOrFail(id)

    response.status(200).json({
      message: 'Holiday ID : ' + id,
      data: holiday
    })
  }

  async update({ request, response, params: { id } }) {
    const holiday = await Holiday.findOrFail(id)
    const { name, from, to, no_of_days } = request.post()

    holiday.name = name
    holiday.from = from
    holiday.to = to
    holiday.no_of_days = no_of_days

    await holiday.save()

    response.status(200).json({
      message: 'Successfully updated.',
      data: holiday
    })
  }

  async destroy ({ response, params: { id } }) {
    const holiday = await Holiday.findOrFail(id)

    await holiday.delete()

    response.status(200).json({
      message: 'Successfully deleted.',
      data: holiday
    })
  }
}

module.exports = HolidayController
