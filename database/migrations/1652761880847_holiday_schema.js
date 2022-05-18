'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class HolidaySchema extends Schema {
  up () {
    this.create('holidays', (table) => {
      table.increments()
      table.timestamps()
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.string('name').notNullable()
      table.string('from').notNullable()
      table.string('to').notNullable()
      table.integer('no_of_days').notNullable()
    })
  }

  down () {
    this.drop('holidays')
  }
}

module.exports = HolidaySchema
