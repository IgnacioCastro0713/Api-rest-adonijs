'use strict';

class RegisterUser {

  get validateAll () {
    return true
  }

  get rules () {
    return {
      name: 'required',
      last_name: 'required',
      email: 'required|email|unique:users',
      password: 'required'
    }
  }

  async fails (errors) {
    return await this.ctx.response.status(400).json({
      errors: errors
    })
  }
}

module.exports = RegisterUser;
