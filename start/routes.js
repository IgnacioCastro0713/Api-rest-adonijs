'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
}).middleware(['auth']);

Route.group(() => {
  // auth routes
  Route.post('login', 'AuthController.login')
    .middleware(['guest'])
    .validator('user/LoginUser');
  Route.post('register', 'AuthController.register')
    .middleware(['guest'])
    .validator('user/RegisterUser');
  Route.post('logout', 'AuthController.logout')
    .middleware(['auth']);

}).prefix('api/v1');
