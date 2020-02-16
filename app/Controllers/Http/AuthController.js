'use strict';
const User = use('App/Models/User');

class AuthController {

  async login({request, auth, response}) {

    const {email, password} = request.all();

    try {
      if (await auth.attempt(email, password)) {
        let user = await User.findBy('email', email);
        let token = await auth.generate(user);
        return response.json({user, token})
      }
    } catch (e) {
      return response.json({message: 'You are not registered!'});
    }
  }

  async register({request, response}) {

    try {
      const user = await User.create(request.only(['name', 'last_name', 'email', 'password']));
      return response.json({user});
    } catch (error) {
      return response.status(500).json({error})
    }

  }

}

module.exports = AuthController;
