'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class UserFeedback extends Model {
  static get table () {
    return 'user_feedback'
  }
}

module.exports = UserFeedback;
