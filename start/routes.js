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
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

//Leaves
Route.group(() => {
  Route.get('/leaves', 'LeaveController.index')
  Route.get('/leaves/:id', 'LeaveController.show').middleware(['findLeave'])
  Route.post('/leaves/create', 'LeaveController.store')
  Route.patch('/leaves/update/:id', 'LeaveController.update').middleware(['findLeave'])
  Route.delete('/leaves/delete/:id', 'LeaveController.destroy').middleware(['findLeave'])
}).middleware(['auth'])

//WorkFromHome
Route.group(() => {
  Route.get('/work_from_home', 'WorkFromHomeController.index')
  Route.get('/work_from_home/:id', 'WorkFromHomeController.show').middleware(['findWorkFromHome'])
  Route.post('/work_from_home/create', 'WorkFromHomeController.store')
  Route.patch('/work_from_home/update/:id', 'WorkFromHomeController.update').middleware(['findWorkFromHome'])
  Route.delete('/work_from_home/delete/:id', 'WorkFromHomeController.destroy').middleware(['findWorkFromHome'])
}).middleware(['auth'])

//Holiday
Route.group(() => {
  Route.get('/holiday', 'HolidayController.index')
  Route.get('/holiday/:id', 'HolidayController.show').middleware(['findHoliday'])
  Route.post('/holiday/create', 'HolidayController.store')
  Route.patch('/holiday/update/:id', 'HolidayController.update').middleware(['findHoliday'])
  Route.delete('/holiday/delete/:id', 'HolidayController.destroy').middleware(['findHoliday'])
}).middleware(['auth'])

//Users
Route.group(() => {
  Route.get('/users', 'UserController.index')
  Route.get('/users/:id', 'UserController.show').middleware(['findUser'])
  Route.patch('/users/update/:id', 'UserController.update').middleware(['findUser'])
  Route.delete('/users/delete/:id', 'UserController.destroy').middleware(['findUser'])
}).middleware(['auth'])

//LogIn LogOut and Register
Route.group(() => {
  Route.get('/login', 'LoginController.store')
  Route.post('/logout', 'LoginController.destroy')
  Route.post('/register', 'RegisterController.store')
}).middleware(['guest'])
