'use strict'

const Schema = use('Schema')

class ModulesSchema extends Schema {
  up () {
    if (!this.hasTable('modules')) return;

    this.create('modules', (table) => {
      table.increments()
      table.string('title', 255).notNullable()
      table.integer('last_active_lesson', 11).defaultsTo(0)
      table.timestamps()
    })
  }

  down () {
    this.drop('modules')
  }
}

module.exports = ModulesSchema
