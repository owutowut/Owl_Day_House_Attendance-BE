'use strict'

const Holiday = use('App/Models/Holiday')

class NotificationController {
  async index ({ response }) {
    try {
      const holidays = await Holiday.all()
      response.status(200).json({
        message: 'All Holiday: ',
        data: holidays
      })
    }
    catch (error) {
      response.send(error.message)
    }
  }
}

module.exports = NotificationController
