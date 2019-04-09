'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Lesson extends Model {
  static get visible () {
    return ['id', 'module_id', 'title']
  }
}

module.exports = Lesson
