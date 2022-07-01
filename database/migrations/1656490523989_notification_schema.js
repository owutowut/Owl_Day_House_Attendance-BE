'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class NotificationSchema extends Schema {
  up () {
    this.create('notifications', (table) => {
      table.increments()
      table.timestamps()
      table.string('leave_id')
      table.string('wfh_id')
      table.string('user_id').notNullable()
      table.string('notification')
    })
  }

  down () {
    this.drop('notifications')
  }
}

module.exports = NotificationSchema
