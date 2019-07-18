'use strict'

const Schema = use('Schema')

class UserFeedbackSchema extends Schema {
  up () {
    if (!this.hasTable('lesson_feedback')) return;

    this.create('lesson_feedback', (table) => {
      table.increments()
      table.integer('lesson_id').notNullable()
      table.integer('feedback_id').notNullable()
      table.integer('creator_id').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('user_feedback')
  }
}

module.exports = UserFeedbackSchema
