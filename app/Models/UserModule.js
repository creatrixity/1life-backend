'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class UserModule extends Model {
  static get table () {
    return 'user_modules'
  }

  lessons () {
    return this.hasMany('App/Models/Module')
  }
}

module.exports = UserModule;
