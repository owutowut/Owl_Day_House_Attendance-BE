'use strict'

const Task = use('App/Models/Task')

class TaskController {
  async index ({ response }) {
    try {
      const tasks = await Task.all()

      response.status(200).json({
        message: 'All Task',
        data: tasks
      })
    }
    catch (error) {
      response.send(error.message)
    }
  }

  async show ({ request, response }) {
    const { id } = request.params

    try {
      const task = await Task.findOrFail(id)

      response.status(200).json({
        message: 'Leave ID : ' + id,
        data: task
      })
    } catch (error) {
      response.send(error.message)
    }
  }

  async yesterdayTasks ({ request, response }) {
    try {
      const { id } = request.params
      const { yesterday } = request.body

      const tasks = await Task.query()
        .where('user_id', 'LIKE', `%${id}%`)
        .where('punchInDate', 'LIKE', `%${yesterday}%`)
        .where('status', 'Pending')
        .fetch()

      response.status(200).json({
        message: 'All yesterday tasks User ID : '+id,
        data: tasks
      })
    }
    catch (error) {
      response.send(error.message)
    }
  }

  async yesterdayWorkList ({ request, response }) {
    try {
      const { id } = request.params
      const { yesterday } = request.body

      const tasks = await Task.query()
        .where('user_id', 'LIKE', `%${id}%`)
        .where('punchInDate', 'LIKE', `%${yesterday}%`)
        .where('status', 'NOT LIKE', 'Break')
        .orderBy('status', 'asc')
        .fetch()

      response.status(200).json({
        message: 'All yesterday tasks User ID : '+id,
        data: tasks
      })
    }
    catch (error) {
      response.send(error.message)
    }
  }

  async todayListPending ({ request, response }) {
    try {
      const { id } = request.params
      const { today } = request.body

      const tasks = await Task.query()
        .where('user_id', 'LIKE', `%${id}%`)
        .where('status', 'LIKE', 'Pending')
        .where('punchInDate', 'LIKE', `%${today}%`)
        .orderBy('created_at', 'desc')
        .fetch()

      response.status(200).json({
        message: 'All Task Pending User ID : '+id,
        data: tasks
      })
    }
    catch (error) {
      response.send(error.message)
    }
  }

  async todayListCompleted ({ request, response }) {
    try {
      const { id } = request.params
      const { today } = request.body

      const tasks = await Task.query()
        .where('user_id', 'LIKE', `%${id}%`)
        .where('status', 'LIKE', 'Completed')
        .where('punchInDate', 'LIKE', `%${today}%`)
        .orderBy('created_at', 'desc')
        .fetch()

      response.status(200).json({
        message: 'All Task Completed User ID : '+id,
        data: tasks
      })
    }
    catch (error) {
      response.send(error.message)
    }
  }

  async workListCompleted ({ request, response }) {
    try {
      const { id } = request.params
      const { page, search } = request.body

      if ( search ) {
        const tasks = await  Task.query()
          .where('user_id', 'LIKE', `%${id}%`)
          .where('status', 'NOT LIKE', 'Pending')
          .where('name', 'LIKE', `%${search}%`)
          .orderBy('created_at', 'desc')
          .paginate(page, 5)

        return response.status(200).json({
          message: 'All Task Completed By Search : '+search,
          tasks
        })
      }

      const tasks = await Task.query()
        .where('user_id', 'LIKE', `%${id}%`)
        .where('status', 'NOT LIKE', 'Pending')
        .orderBy('created_at', 'desc')
        .paginate(page, 5)

      response.status(200).json({
        message: 'All Task Completed User ID : '+id,
        tasks
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

    try {
      data.weekday = day
      data.punchIn = currentTime
      data.punchInDate = currentDate
      const task = await Task.create(data)

      response.status(200).json({
        message: 'Successfully created.',
        data:task
      })
    } catch (error) {
      response.send(error.message)
    }
  }

  async addToTask ({ request, response }) {
    const data = request.body
    const oldTask = await Task.find(data.data.id)

    try {
      const lastID = await Task.query().last()

      data.data.id = lastID.id+1
      const addToTask = await Task.create(data.data)

      const today = new Date();
      today.getDate()

      addToTask.created_at = today
      addToTask.save()

      oldTask.proceeding = 'Pending...'
      oldTask.save()

      response.status(200).json({
        message: 'Successfully Add Task',
        addToTask
      })
    } catch (error) {
      response.send(error.message)
    }
  }

  async taskCompleted({ request, response }) {
    const { id } = request.params
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

    try {
      const task = await Task.findOrFail(id)
      task.proceeding = data.proceeding
      task.status = data.status
      task.punchOutTime = currentTime
      task.punchOutDate = currentDate
      task.punchOutFull = `${day}, ${currentDate} ${currentTime}`

      const punchInDate = task.punchInDate.split("/")
      const punchOutDate = task.punchOutDate.split("/")
      const result = parseInt(punchOutDate[0]-punchInDate[0])

      task.no_of_days = result+1

      //get time record
      const now = new Date()
      const getCurrentTime = now.getTime()
      const from = new Date(task.created_at)
      const timeRecord = from.getTime()
      task.timeRecord = parseFloat(Math.abs(getCurrentTime - timeRecord) / 36e5).toFixed(2)

      task.save()

      response.status(200).json({
        message: 'Successfully Task Completed.',
        data: task
      })
    } catch (error) {
      response.send(error.message)
    }
  }

  async update({ request, response }) {
    const { id } = request.params
    const data = request.body

    //get currentDay
    const todayDate = new Date();
    const currentDate = todayDate.toLocaleDateString();

    //get currentTime
    const todayTime = new Date();
    const currentTime = todayTime.getHours() + ":" + todayTime.getMinutes() + ":" + todayTime.getSeconds();

    try {
      const task = await Task.findOrFail(id)

      task.name = data.name
      task.status = data.status
      task.details = data.details
      task.proceeding = data.proceeding
      task.punchOutTime = currentTime
      task.punchOutDate = currentDate
      task.timeRecord = data.timeRecord

      if (data.status==='Break') {
        const punchInDate = task.punchInDate.split("/")
        const punchOutDate = task.punchOutDate.split("/")
        const result = parseInt(punchOutDate[0]-punchInDate[0])

        task.no_of_days = result+1
      }

      task.save()

      response.status(200).json({
        message: 'Successfully updated.',
        data: task
      })
    } catch (error) {
      response.send(error.message)
    }
  }


}

module.exports = TaskController
