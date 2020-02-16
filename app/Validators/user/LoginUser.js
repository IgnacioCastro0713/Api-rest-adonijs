'use strict';

class LoginUser {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      email: 'required|email',
      password: 'required'
    }
  }

  async fails (errors) {
    return await this.ctx.response.status(400).json({
      errors
    })
  }

}

module.exports = LoginUser;
