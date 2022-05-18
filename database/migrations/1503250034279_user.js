'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('first_name').notNullable()
      table.string('last_name').notNullable()
      table.string('email', 254).notNullable().unique()
      table.string('password', 60).notNullable()
      table.string('role').notNullable()
      table.string('position').notNullable()
      table.string('tag').notNullable()
      table.string('phone').notNullable()
      table.string('birthday').notNullable()
      table.timestamps()
      table.string('report_to').notNullable()
      table.string('address').notNullable()
      table.string('state').notNullable()
      table.string('country').notNullable()
      table.string('pin_code').notNullable()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
