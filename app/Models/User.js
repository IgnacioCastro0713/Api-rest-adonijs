'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash');

class User extends Model {
  static boot () {
    super.boot();

    this.addHook('beforeSave', 'UserHook.hasPassword')
  }

  static get hidden() {
    return ['password']
  }


  tokens() {
    return this.hasMany('App/Models/Token');
  }
}

module.exports = User;
