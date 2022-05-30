'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('profile')
      table.string('first_name').notNullable()
      table.string('last_name').notNullable()
      table.string('email', 254).notNullable().unique()
      table.string('password', 254).notNullable()
      table.string('role').default('admin')
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
      table.string('gender').notNullable()
      table.string('date_of_join').default(new Date())
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
