'use strict'

const Task = use('App/Models/Task')

class TaskController {
  async index ({ request, response }) {
    const { id } = request.params
    try {
      const tasks = await Task.query()
        .where('user_id', 'LIKE', `%${id}%`)
        .orderBy('created_at', 'desc')
        .fetch()

      response.status(200).json({
        message: 'All Task User ID : '+id,
        data: tasks
      })
    }
    catch (error) {
      response.send(error.message)
    }
  }

  async store ({ request, response }) {
    const data = request.body

    try {
      const task = await Task.create(data)

      response.status(200).json({
        message: 'Successfully created.',
        data:task
      })
    } catch (error) {
      response.send(error.message)
    }
  }
}

module.exports = TaskController
