'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TaskSchema extends Schema {
  up () {
    this.create('tasks', (table) => {
      table.increments()
      table.timestamps()
      table.string('user_id').notNullable()
      table.string('name').notNullable()
      table.string('details').notNullable()
    })
  }

  down () {
    this.drop('tasks')
  }
}

module.exports = TaskSchema
