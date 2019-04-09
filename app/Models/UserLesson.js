'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class UserLesson extends Model {
  static get table () {
    return 'user_lessons'
  }

  lessons () {
    return this.hasMany('App/Models/Lesson')
  }
}

module.exports = UserLesson;
