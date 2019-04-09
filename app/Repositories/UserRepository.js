'use strict'

class UserRepository {
  constructor (model) {
    this.model = model;
  }

  async fetchUserLessons () {
    return await this.model.lessons().fetch()
  }
}

module.exports = UserRepository
