'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Course extends Model {
  static get visible () {
    return ['id', 'title']
  }

  lessons () {
    return this.hasMany('App/Models/Module')
  }
}

module.exports = Course
