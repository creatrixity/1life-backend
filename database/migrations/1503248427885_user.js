'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    if (!this.hasTable('users')) return;

    this.create('users', (table) => {
      table.increments()
      table.string('name', 255)
      table.string('email', 254).notNullable().unique()
      table.string('password', 60).notNullable()
      table.string('account_status', 60).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
