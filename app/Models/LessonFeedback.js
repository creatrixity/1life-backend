'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class LessonFeedback extends Model {
  static get table () {
    return 'lesson_feedback'
  }

  feedbacks () {
    return this.hasMany('App/Models/Feedback', 'feedback_id', 'id')
  }
}

module.exports = LessonFeedback;
