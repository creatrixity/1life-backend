'use strict';

const User = use('App/Models/User');

class UserController {
  async index({ view }) {
    const users = await User.query().fetch();

    return view.render('users.list-users', { users: users.toJSON() });
  }

  async getAuthenticatedUser({ auth }) {
    const user = await auth.getUser();

    return { user };
  }
}

module.exports = UserController;
