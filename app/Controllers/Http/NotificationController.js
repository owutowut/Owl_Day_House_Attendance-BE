'use strict'

const Notification = use('App/Models/Notification')
const Leave = use('App/Models/Leave')
const WorkFromHome = use('App/Models/WorkFromHome')

class NotificationController {
  async index ({ request, response }) {
    const { id } = request.params
    try {
      const notifications = await Notification.query()
        .where('user_id', 'LIKE', `%${id}%`)
        .orderBy('created_at', 'desc')
        .fetch()

      response.status(200).json({
        message: 'All Notifications User ID : '+id,
        data: notifications
      })
    }
    catch (error) {
      response.send(error.message)
    }
  }

  async store ({ request, response }) {
    try {
      const data = request.body
      const { leave_id, wfh_id } = request.body
      if ( leave_id ) {
        const leave = await Leave.find(leave_id)
        if ( leave ) {
          if ( leave.status === "Approve") {
            data.notification = `คุณได้รับการอนุมัติการ${leave.leave_type}ในวันที่ ${leave.from} ของคุณเรียบร้อยแล้ว!`
            const notification = await Notification.create(data)

            response.status(200).json({
              message: 'Successfully created.',
              notification
            })

          } else {
            return response.send('Invalid Status!')
          }
        } else {
          return response.send('Leave Not found!')
        }
      }
      if ( wfh_id ) {
        const wfh = await WorkFromHome.find(wfh_id)
        if ( wfh ) {
          if ( wfh.status === "Approve") {
            data.notification = `คุณได้รับการอนุมัติการ Work from Home ในวันที่ ${wfh.from} ของคุณเรียบร้อยแล้ว!`

            const notification = await Notification.create(data)

            response.status(200).json({
              message: 'Successfully created.',
              notification
            })
          } else {
            return response.send('Invalid Status!')
          }
        } else {
          return response.send('Work from Home Not found!')
        }
      }
    }
    catch (error) {
      response.send(error.message)
    }
  }
}

module.exports = NotificationController
