'use strict'

const Attendance = use('App/Models/Attendance')

class AttendanceController {
  async index ({ request, response }) {
    const { page, search, selected, selected_status } = request.body

    try {
      if ( search ) {
        const attendance = await Attendance.query().where('name', 'LIKE', `%${search}%`).paginate(page, 5)

        return response.status(200).json({
          message: 'Attendance by search :'+search,
          data: attendance
        })
      }

      if ( selected ) {
        if (!selected_status) {
          const attendance = await Attendance.query().where('tag', 'LIKE', `%${selected}%`).paginate(page, 5)

          return response.status(200).json({
            message: 'Attendance by selected :'+selected,
            data: attendance
          })
        }
        if (selected_status) {
          const attendance = await Attendance.query()
            .where('tag', 'LIKE', `%${selected}%`)
            .where('status', 'LIKE', `%${selected_status}%`)
            .paginate(page, 5)

          return response.status(200).json({
            message: 'Attendance by tag, selected :'+selected+', '+selected_status,
            data: attendance
          })
        }
      }
      if ( selected_status ) {
        const attendance = await  Attendance.query().where('status', 'LIKE', `%${selected_status}%`).paginate(page, 5)

        return response.status(200).json({
          message: 'Attendance by selected status :'+selected_status,
          data: attendance
        })
      }

      const attendance = await Attendance.query().paginate(page, 5)

      response.status(200).json({
        message: 'Attendance All',
        data: attendance
      })
    } catch (error) {
      response.send(error.message)
    }
  }

  async show ({ request, response }) {
    const { id } = request.params

    try {
      const attendance = await Attendance.query()
        .where('user_id', 'LIKE', `%${id}%`)
        .orderBy('created_at', 'desc')
        .first()

      const now = new Date()
      const currentTime = now.getTime()
      const from = new Date(attendance.created_at)
      const timeRecord = from.getTime()
      attendance.timeRecord = parseFloat(Math.abs(currentTime - timeRecord) / 36e5).toFixed(2)
      attendance.save()

      response.status(200).json({
        message: 'Attendance User ID :'+id,
        data: attendance
      })
    }
    catch (error) {
      response.send(error.message)
    }
  }

  async store ({ request, response }) {
    const data = request.body

    //get currentDay
    const todayDate = new Date();
    const currentDate = todayDate.toLocaleDateString();

    //get currentTime
    const todayTime = new Date();
    const currentTime = todayTime.getHours() + ":" + todayTime.getMinutes() + ":" + todayTime.getSeconds();

    //get weekday
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const d = new Date();
    const day = weekday[d.getDay()];

    //get date from for cal
    const from = new Date();

    try {
      data.date = currentDate
      data.weekday = day
      data.punchIn = currentTime
      data.from = from
      const attendance = await Attendance.create(data)

      response.status(200).json({
        message: 'Successfully created.',
        data:attendance
      })
    } catch (error) {
      response.send(error.message)
    }
  }

  async update({ request, response }) {
    const { id } = request.params
    const { status } = request.body

    const todayTime = new Date();
    const currentTime = todayTime.getHours() + ":" + todayTime.getMinutes() + ":" + todayTime.getSeconds();

    try {
      const attendance = await Attendance.findOrFail(id)
      attendance.status = status
      attendance.punchOut = currentTime
      attendance.save()

      response.status(200).json({
        message: 'Successfully updated.',
        attendance
      })
    } catch (error) {
      response.send(error.message)
    }
  }
}

module.exports = AttendanceController
