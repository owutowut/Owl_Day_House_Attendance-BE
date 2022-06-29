'use strict'
const WorkFromHome = use('App/Models/WorkFromHome')

class UserWorkFromHomeController {
  async index ({ request, response }) {
    try {
      const { id, page, selected, search } = request.body

      if ( selected ) {
        const work_from_home = await  WorkFromHome.query()
          .where('user_id', 'LIKE', `%${id}%`)
          .where('created_at', 'LIKE', `%${selected}%`)
          .paginate(page, 5)

        return response.status(200).json({
          message: 'Leaves by selected User ID: '+id,
          work_from_home
        })
      }
      if ( search ) {
        const work_from_home = await  WorkFromHome.query()
          .where('user_id', 'LIKE', `%${id}%`)
          .where('reason', 'LIKE', `%${search}%`)
          .paginate(page, 5)

        return response.status(200).json({
          message: 'Leaves by search User ID: '+id,
          work_from_home
        })
      }
      const work_from_home = await WorkFromHome.query().where('user_id', 'LIKE', `%${id}%`).paginate(page, 5)

      response.status(200).json({
        message: 'WorkFromHome User ID: '+id,
        work_from_home
      })
    } catch (error) {
      response.send(error.message)
    }
  }
}

module.exports = UserWorkFromHomeController
