"use strict";
const MAIL_PATTERN = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const Persona = use("Persona");
const Config = use("Config");
const User = use("App/Models/User");
const UserRepository = use("App/Repositories/UserRepository");

const { validate } = use("Validator");

class ApiAuthController {
  async generateUserPayload(uid, credentials) {
    const user = await User.findBy('email', uid);
    const userRepo = new UserRepository(user);
    const lessons = await userRepo.fetchUserLessons();

    return {
      credentials,
      user,
      lessons
    }
  }

  async attemptLogin(auth, uid, password) {
    // Determine which JWT authenticator will be used: Email or Username.
    // If the uid value matches the test pattern, Email authentication is used.
    const authScheme = 'jwt';

    const credentials = await auth
      .authenticator(authScheme)
      .withRefreshToken()
      .attempt(uid, password)
      
    return this.generateUserPayload(uid, credentials);
  }

  async login({ request, auth, response }) {
    const { uid, password } = request.only(["uid", "password"]);

    return this.attemptLogin(auth, uid, password);
  }

  async register({ request, auth, response }) {
    const payload = request.only([
      "name",
      "email",
      "password",
      "password_confirmation"
    ]);

    const validation = await validate(
      payload,
      Config.get("adonis-auth-scaffold.validationRules.registration"),
      Config.get("adonis-auth-scaffold.validationMessages")()
    );

    if (validation.fails()) {
      return {
        errors: validation.messages()
      }
    }

    try {
      await Persona.register(payload);

      return this.attemptLogin(auth, payload.email, payload.password);
    } catch (error) {
      return {
        error
      }
    }
  }

}

module.exports = ApiAuthController;
