'use strict'

const Schema = use('Schema')

class UserFeedbackSchema extends Schema {
  up () {
    if (!this.hasTable('user_feedback')) return;

    this.create('user_feedback', (table) => {
      table.increments()
      table.string('question', 255).notNullable()
      table.text('answer').notNullable()
      table.integer('course_id').notNullable()
      table.integer('module_id').notNullable()
      table.integer('lesson_id').notNullable()
      table.integer('user_id').notNullable()
      table.integer('feedback_id').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('user_feedback')
  }
}

module.exports = UserFeedbackSchema
