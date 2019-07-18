'use strict'

const Schema = use('Schema')

class FeedbackSchema extends Schema {
  up () {
    if (!this.hasTable('feedbacks')) return;

    this.create('feedbacks', (table) => {
      table.increments()
      table.string('question', 255).notNullable()
      table.text('answer').notNullable()
      table.enum('type', ['checkbox', 'input', 'rating']).notNullable()
      table.integer('serial_id').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('feedbacks')
  }
}

module.exports = FeedbackSchema
