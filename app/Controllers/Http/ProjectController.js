'use strict'

const Project = use('App/Models/Project')

class ProjectController {
    async index ({response}) {
        try {
            const project = await Project.all()

            response.status(200).json({
            message: 'All Project',
            data:project
            })
        } catch (error) {
            response.send(error.message)
        }
    }

    async getById ({ request,response }) {
        try {
            const { id } = request.params

            const project = await Project.findOrFail(id)

            response.status(200).json({
                message: 'Project ID : '+id,
                data:project
            })
        } catch (error) {
            response.send(error.message)
        }
    }

    async store ({ request, response }) {
        try {
            const data = request.body
            
            const project = await Project.create(data)

            response.status(200).json({
            message: 'Successfully created.',
            data:project
            })
        } catch (error) {
            response.send(error.message)
        }
    }
}

module.exports = ProjectController
