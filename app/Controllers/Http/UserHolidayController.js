'use strict'

const Holiday = use('App/Models/Holiday')

class UserHolidayController {
  async index ({ response }) {
    try {
      //get current month
      const today = new Date();
      const current_month = today.getMonth()+1;

      const holidays = await Holiday.query()
        .where('from', 'LIKE', `%${current_month}%`)
        .orderBy('created_at', 'desc')
        .fetch()

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

module.exports = UserHolidayController
