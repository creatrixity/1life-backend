'use strict'

const Schema = use('Schema')

class ModulesSchema extends Schema {
  up () {
    if (!this.hasTable('modules')) return;

    this.create('modules', (table) => {
      table.increments()
      table.string('title', 255).notNullable()
      table.integer('course_id').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('modules')
  }
}

module.exports = ModulesSchema
