'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class WorkFromHomeSchema extends Schema {
  up () {
    this.create('work_from_homes', (table) => {
      table.increments()
      table.timestamps()
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.string('name').notNullable()
      table.string('from').notNullable()
      table.string('to').notNullable()
      table.integer('no_of_days').notNullable()
      table.string('reason').notNullable()
      table.string('detail').notNullable()
      table.string('punchIn').notNullable()
      table.string('punchOut').notNullable()
      table.string('status').default('pending')
      table.string('tag').notNullable()
    })
  }

  down () {
    this.drop('work_from_homes')
  }
}

module.exports = WorkFromHomeSchema
