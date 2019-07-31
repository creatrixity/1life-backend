'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Feedback extends Model {
  static get visible () {
    return [
      'id',
      'question',
      'answer',
      'type',
      'serial_id'
    ]
  }
}

module.exports = Feedback
