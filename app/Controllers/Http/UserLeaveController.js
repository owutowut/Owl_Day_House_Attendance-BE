'use strict'

const Leave = use('App/Models/Leave')

class UserLeaveController {
  async index ({ request, response }) {
    const { id, page, selected } = request.body

    //get user sick leaves total
    const sick_leaves = await Leave.query().where('user_id', 'LIKE', `%${id}%`).where('leave_type', 'ลาป่วย').count()
    const sick_leaves_total = sick_leaves[0]['count(*)']

    //get user business leaves total
    const business_leaves = await Leave.query().where('user_id', 'LIKE', `%${id}%`).where('leave_type', 'ลากิจ').count()
    const business_leaves_total = business_leaves[0]['count(*)']

    //get user all leaves total
    const all_leaves = await Leave.query().where('user_id', 'LIKE', `%${id}%`).count()
    const all_leaves_total = all_leaves[0]['count(*)']

    //get current month
    const today = new Date();
    const current_month = today.getMonth()+1;
    //get user all leaves total of current month
    const all_leaves_month = await Leave.query().where('user_id', 'LIKE', `%${id}%`).where('from', 'LIKE', `%${current_month}%`).count()
    const all_leaves_month_total = all_leaves_month[0]['count(*)']

    try {
      if ( selected ) {
        const leaves = await  Leave.query()
          .where('user_id', 'LIKE', `%${id}%`)
          .where('leave_type', 'LIKE', `%${selected}%`)
          .paginate(page, 5)

        return response.status(200).json({
          message: 'Leaves by selected User ID: '+id,
          leaves, sick_leaves_total, business_leaves_total, all_leaves_total, all_leaves_month_total
        })
      }
      const leaves = await Leave.query().where('user_id', 'LIKE', `%${id}%`).paginate(page, 5)

      response.status(200).json({
        message: 'Leaves All User ID: '+id,
        leaves, sick_leaves_total, business_leaves_total, all_leaves_total, all_leaves_month_total
      })
    } catch (error) {
      response.send(error.message)
    }
  }
}

module.exports = UserLeaveController
