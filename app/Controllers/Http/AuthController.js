'use strict'
const User = use('App/Models/User');

class AuthController {

  async login({request, auth,response}) {

    const {email, password} = request.all();

    try {
      if (await auth.attempt(email, password)) {
        let user = await User.findBy('email', email);
        let token = await auth.generate(user);
        return response.json({user, token})
      }
    } catch (e) {
      return response.status(401).json({e})
    }
  }

  async register({request, response}) {

    const {username, email, password} = request.all();

    try {
      const user = await User.create([username, email, password]);
      return response.json({user});
    } catch (e) {
      return response.status(500).json({e})
    }

  }

  async logout({request, auth, response}) {
    try {
      const apiToken = auth.getAuthHeader('bearer');
      await auth
        .authenticator('jwt')
        .revokeTokens([apiToken]);
        return response.status(200).json({ message: "Logout successfully!" });
    } catch (e) {
      return response.json({e, message: "Invalid jwt token" });
    }
  }

}

module.exports = AuthController;
