'use strict';

class RegisterUser {

  get validateAll () {
    return true
  }

  get rules () {
    return {
      username: 'required',
      email: 'required|email|unique:users',
      password: 'required'
    }
  }

  get messages () {
    return {
      'username.required': 'You must provide a username.',
      'email.required': 'You must provide a email address.',
      'email.email': 'You must provide a valid email address.',
      'email.unique': 'This email is already registered.',
      'password.required': 'You must provide a password'
    }
  }

  async fails (errorMessages) {
    return await this.ctx.response.status(400).json({
      errorMessages
    })
  }
}

module.exports = RegisterUser;
