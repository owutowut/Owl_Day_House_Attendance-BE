'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LeaveSchema extends Schema {
  up () {
    this.create('leaves', (table) => {
      table.increments()
      table.timestamps()
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.string('leave_type').notNullable()
      table.string('from').notNullable()
      table.string('to').notNullable()
      table.integer('no_of_days').notNullable()
      table.string('reason').notNullable()
    })
  }

  down () {
    this.drop('leaves')
  }
}

module.exports = LeaveSchema
