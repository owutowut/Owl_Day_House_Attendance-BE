'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AttendanceSchema extends Schema {
  up () {
    this.create('attendances', (table) => {
      table.increments()
      table.timestamps()
      table.string('user_id').notNullable()
      table.string('name')
      table.string('tag')
      table.string('status').default('Pending')
      table.string('date')
      table.string('from')
      table.string('weekday')
      table.string('punchIn')
      table.string('punchOut').default('--.--')
      table.string('timeRecord').default('0.00 hrs')
    })
  }

  down () {
    this.drop('attendances')
  }
}

module.exports = AttendanceSchema
