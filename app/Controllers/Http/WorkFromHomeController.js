'use strict'

const WorkFromHome = use('App/Models/WorkFromHome')

class WorkFromHomeController {
  async index ({ response }) {
    const work_from_home= await WorkFromHome.all()

    response.status(200).json({
      message: 'All Work from home.',
      data: work_from_home
    })
  }

  async store ({ request, response }) {
    const { name, leave_type, from, to, no_of_days, tag, status } = request.post()

    const work_from_home = await WorkFromHome.create({ name, leave_type, from, to, no_of_days, tag, status })

    response.status(200).json({
      message: 'Successfully created.',
      data:work_from_home
    })
  }

  async show({ response, params: { id } }) {
    const work_from_home = await WorkFromHome.findOrFail(id)

    response.status(200).json({
      message: 'Work from home ID : ' + id,
      data: work_from_home
    })
  }

  async update({ request, response, params: { id } }) {
    const work_from_home = await WorkFromHome.findOrFail(id)
    const { name, leave_type, from, to, no_of_days, tag, status } = request.post()

    work_from_home.name = name
    work_from_home.leave_type = leave_type
    work_from_home.from = from
    work_from_home.to = to
    work_from_home.no_of_days = no_of_days
    work_from_home.tag = tag
    work_from_home.status = status

    await work_from_home.save()

    response.status(200).json({
      message: 'Successfully updated.',
      data: work_from_home
    })
  }

  async destroy ({ response, params: { id } }) {
    const work_from_home = await WorkFromHome.findOrFail(id)

    await work_from_home.delete()

    response.status(200).json({
      message: 'Successfully deleted.',
      data: work_from_home
    })
  }
}

module.exports = WorkFromHomeController
