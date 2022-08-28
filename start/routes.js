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
//Home
Route.get('home', 'HomeController.index')
//notifications
Route.get('notifications/:id', 'NotificationController.index')
Route.post('notifications/create', 'NotificationController.store')
//attend
Route.group(() => {
  Route.post('/all', 'AttendanceController.index')
  Route.post('/create', 'AttendanceController.store')
  Route.get('/:id', 'AttendanceController.show')
  Route.patch('/update/:id', 'AttendanceController.update')
}).prefix('attendance')
//Task
Route.group(() => {
  Route.get('/all', 'TaskController.index')
  Route.get('/:id', 'TaskController.show')
  Route.post('/create', 'TaskController.store')
  Route.post('/addToTask', 'TaskController.addToTask')
  Route.patch('/update/:id', 'TaskController.update')
  Route.patch('/completed/:id', 'TaskController.taskCompleted')
  Route.post('/yesterdayTasks/:id', 'TaskController.yesterdayTasks')
  Route.post('/yesterdayWorkList/:id', 'TaskController.yesterdayWorkList')
  Route.post('/today/pending/:id', 'TaskController.todayListPending')
  Route.post('/today/completed/:id', 'TaskController.todayListCompleted')
  Route.post('/completed/:id', 'TaskController.workListCompleted')
}).prefix('task')
//Leaves
Route.group(() => {
  Route.post('/', 'LeaveController.index')
  Route.post('/create', 'LeaveController.store')
}).prefix('leaves')
Route.group(() => {
  Route.get(':id', 'LeaveController.show')
  Route.patch('update/:id', 'LeaveController.update')
  Route.delete('delete/:id', 'LeaveController.destroy')
}).prefix('leaves').middleware(['findLeave'])
//Leaves[user]
Route.group(() => {
  Route.post('/user', 'UserLeaveController.index')
}).prefix('leaves')
//WorkFromHome
Route.group(() => {
  Route.post('/', 'WorkFromHomeController.index')
  Route.post('create', 'WorkFromHomeController.store')
}).prefix('work_from_home')
Route.group(() => {
  Route.get(':id', 'WorkFromHomeController.show')
  Route.patch('update/:id', 'WorkFromHomeController.update')
  Route.delete('delete/:id', 'WorkFromHomeController.destroy')
}).prefix('work_from_home').middleware(['findWorkFromHome'])
//WorkFromHome[user]
Route.group(() => {
  Route.post('/user', 'UserWorkFromHomeController.index')
}).prefix('work_from_home')
//Holiday
Route.group(() => {
  Route.post('/', 'HolidayController.index')
  Route.post('create', 'HolidayController.store')
}).prefix('holiday')
Route.group(() => {
  Route.get(':id', 'HolidayController.show')
  Route.patch('update/:id', 'HolidayController.update')
  Route.delete('delete/:id', 'HolidayController.destroy')
}).prefix('holiday').middleware(['findHoliday'])
//Holiday[user]
Route.get('user/holiday', 'UserHolidayController.index')
//[HR]
Route.group(() => {
  Route.post('/', 'UserController.index')
}).prefix('users')
Route.group(() => {
  Route.get(':id', 'UserController.show')
  Route.patch('update/:id', 'UserController.update')
  Route.delete('delete/:id', 'UserController.destroy')
  Route.patch('change_password/:id', 'UserController.changePassword')
}).prefix('users').middleware(['findUser'])
Route.post('forgot_password','ForgotPasswordController.index')
Route.patch('forgot_password/:token','ForgotPasswordController.update')
//LogIn LogOut and Register
Route.group(() => {
  Route.post('/login', 'LoginController.store')
  Route.post('/register', 'RegisterController.store')
  Route.get('/me', 'UserController.getProfile')
}).middleware(['guest'])
