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
      table.string('status').default('Pending')
      table.string('proceeding')
      table.string('weekday')
      table.string('punchIn')
      table.string('punchInDate')
      table.string('punchOutTime')
      table.string('punchOutDate')
      table.string('punchOutFull')
      table.string('no_of_days')
      table.string('timeRecord')
    })
  }

  down () {
    this.drop('tasks')
  }
}

module.exports = TaskSchema
