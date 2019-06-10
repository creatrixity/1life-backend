"use strict";

const User = use("App/Models/User");

class UserController {
  async index ({ view, response }) {
    const users = await User.query().fetch()

    return view.render('users.list-users', { users: users.toJSON() });
  }
}

module.exports = UserController;
