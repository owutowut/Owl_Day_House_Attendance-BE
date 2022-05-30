'use strict'

const Leave = use('App/Models/Leave')

class LeaveController {
  async index ({ request, response }) {
    const { page, search, selected } = request.all
    //get current month
    const today = new Date();
    const current_month = today.getMonth()+1;

    //get sick leaves total
    const sick_leaves = await Leave.query().where('leave_type', 'ลาป่วย').count()
    const sick_leaves_total = sick_leaves[0]['count(*)']
    //get business leaves total
    const business_leaves = await Leave.query().where('leave_type', 'ลากิจ').count()
    const business_leaves_total = business_leaves[0]['count(*)']
    //get all leaves total
    const all_leaves = await Leave.query().count()
    const all_leaves_total = all_leaves[0]['count(*)']
    //get all leaves total of current month
    const all_leaves_month = await Leave.query().where('from', 'LIKE', `%${current_month}%`).count()
    const all_leaves_month_total = all_leaves_month[0]['count(*)']

    try {
      if ( search ) {
        const leaves = await Leave.query().where('name', `%${search}%`).paginate(page, 5)

        return response.status(200).json({
          message: 'Leaves by search',
          leaves, sick_leaves_total, business_leaves_total, all_leaves_total, all_leaves_month_total
        })
      }

      if ( selected ) {
        const leaves = await  Leave.query()
          .where('leave_type', 'LIKE', `%${selected}%`)
          .paginate(page, 5)

        return response.status(200).json({
          message: 'Leaves by selected',
          leaves, sick_leaves_total, business_leaves_total, all_leaves_total, all_leaves_month_total
        })
      }

      const leaves = await Leave.query().paginate(page, 5)

      response.status(200).json({
        message: 'Leaves All',
        leaves, sick_leaves_total, business_leaves_total, all_leaves_total, all_leaves_month_total
      })
    } catch (error) {
      response.send(error.message)
    }
  }

  async store ({ request, response }) {
    const data = request.all()

    try {
      const leave = await Leave.create(data)

      response.status(200).json({
        message: 'Successfully created.',
        data:leave
      })
    } catch (error) {
      response.send(error.message)
    }
  }

  async show({ response, request }) {
    const { id } = request.params

    try {
      const leave = await Leave.findOrFail(id)

      response.status(200).json({
        message: 'Leave ID : ' + id,
        leave
      })
    } catch (error) {
      response.send(error.message)
    }
  }

  async update({ request, response }) {
    const { id } = request.params
    const { status } = request.body

    try {
      const leave = await Leave.findOrFail(id)

      leave.status = status

      leave.save(leave)

      response.status(200).json({
        message: 'Successfully updated.',
        leave
      })
    } catch (error) {
      response.send(error.message)
    }
  }

  async destroy ({ response, request }) {
    const { id } = request.params
    const leave = await Leave.findOrFail(id)

    try {
      leave.delete(leave)

      response.status(200).json({
        message: 'Successfully deleted.',
        leave
      })
    } catch (error) {
      response.send(error.message)
    }
  }
}

module.exports = LeaveController
