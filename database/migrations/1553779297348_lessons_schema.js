'use strict'

const Schema = use('Schema')

class LessonsSchema extends Schema {
  up () {
    if (!this.hasTable('lessons')) return;

    this.create('lessons', (table) => {
      table.increments()
      table.integer('module_id')
      table.string('title', 255).notNullable()
      table.enum('type', ['lesson', 'tool']).defaultsTo('lesson')
      table.timestamps()
    })
  }

  down () {
    this.drop('lessons')
  }
}

module.exports = LessonsSchema
