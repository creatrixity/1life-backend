'use strict'

const Schema = use('Schema')

class UserModuleSchema extends Schema {
  up () {
    if (!this.hasTable('user_modules')) return;

    this.create('user_modules', (table) => {
      table.increments()
      table.integer('user_id')
      table.integer('module_id')
      table.integer('progression').defaultsTo(0);
      table.timestamps()
    })
  }

  down () {
    this.drop('user_modules')
  }
}

module.exports = UserModuleSchema
