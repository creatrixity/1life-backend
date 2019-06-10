'use strict'

require('./apiAuthRoutes.js');

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('welcome')
Route.get('/users', 'UserController.index')
Route
  .group(() => {
    Route.get('/modules/:id', 'ModuleController.index')
    Route.post('/getModuleData', 'ModuleController.getModuleData')
    Route.post('/modules/getUserModules', 'ModuleController.getUserModules')
    Route.post('/modules/getUserLessons', 'ModuleController.getUserLessons')
    Route.post('/modules/updateUserLesson', 'ModuleController.updateUserLessonInstance')
    Route.post('/modules/updateUserModule', 'ModuleController.updateUserModuleInstance')
    Route.post('/feedback', 'FeedbackController.createFeedback')
    Route.post('/feedback/getFeedback', 'FeedbackController.getFeedback')
    Route.get('/feedback/export/user-:userId-feedback.txt', 'FeedbackController.exportFeedback')
  })
  .prefix('/api/v1')