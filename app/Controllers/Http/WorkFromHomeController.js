'use strict'

const WorkFromHome = use('App/Models/WorkFromHome')

class WorkFromHomeController {
  async index ({ request, response }) {
    const { page, search, selected } =  request.body

    try {
      if ( search ) {
        const work_from_home = await WorkFromHome.query()
          .where('name', 'LIKE', `%${search}%`)
          .paginate(page, 5)

        return response.status(200).json({
          message: 'Work from Home by search: '+search,
          work_from_home
        })
      }
      if ( selected ) {
        const work_from_home = await WorkFromHome.query()
          .where('created_at', 'LIKE', `%${selected}%`)
          .paginate(page, 5)

        return response.status(200).json({
          message: 'Work from Home selected: '+selected,
          work_from_home
        })
      }

      const work_from_home = await WorkFromHome.query().paginate(page, 5)

      response.status(200).json({
        message: 'Work from Home Page: '+page,
        work_from_home
      })
    } catch (error) {
      response.send(error.message)
    }
  }

  async store ({ request, response }) {
    const data = request.body

    try {
      const work_from_home = await WorkFromHome.create(data)

      response.status(200).json({
        message: 'Successfully created.',
        data: work_from_home
      })
    } catch (error) {
      response.send(error.message)
    }
  }

  async show({ response, request }) {
    const { id } = request.params

    try {
      const work_from_home = await WorkFromHome.findOrFail(id)

      response.status(200).json({
        message: 'Work from home ID : ' + id,
        data: work_from_home
      })
    } catch (error) {
      response.send(error.message)
    }
  }

  async update({ request, response }) {
    const { id } = request.params
    const data = request.body

    try {
      const work_from_home = await WorkFromHome.findOrFail(id)

      work_from_home.name = data.name
      work_from_home.leave_type = data.leave_type
      work_from_home.from = data.from
      work_from_home.to = data.to
      work_from_home.no_of_days = data.no_of_days
      work_from_home.tag = data.tag
      work_from_home.status = data.status

      work_from_home.save(work_from_home)

      response.status(200).json({
        message: 'Successfully updated.',
        data: work_from_home
      })
    } catch (error) {
      response.send(error.message)
    }
  }

  async destroy ({ response, request }) {
    const { id } = request.params

    try {
      const work_from_home = await WorkFromHome.findOrFail(id)

      work_from_home.delete(work_from_home)

      response.status(200).json({
        message: 'Successfully deleted.',
        data: work_from_home
      })
    } catch (error) {
      response.send(error.message)
    }
  }
}

module.exports = WorkFromHomeController
