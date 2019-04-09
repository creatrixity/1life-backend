'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Module extends Model {
  static get visible () {
    return ['id', 'title']
  }

  lessons () {
    return this.hasMany('App/Models/Lesson')
  }
}

module.exports = Module
