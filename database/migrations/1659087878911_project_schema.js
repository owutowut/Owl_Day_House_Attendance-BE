'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProjectSchema extends Schema {
  up () {
    this.create('projects', (table) => {
      table.increments()
      table.timestamps()
      table.string('name').notNullable()
      table.string('details').notNullable()
      table.float('timeRecord').default(0)
      table.string('timeRecordDetails')
      table.float('designer').default(0)
      table.float('tester').default(0)
      table.float('developer').default(0)
    })
  }

  down () {
    this.drop('projects')
  }
}

module.exports = ProjectSchema
