'use strict';

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
const Route = use('Route');

Route.on('/').render('welcome');
Route.get('/users', 'UserController.index');

Route.group(() => {
  Route.get('/getAuthenticatedUser', 'UserController.getAuthenticatedUser');
  Route.get('/fetchModuleLessonView', 'ModuleController.fetchModuleLessonView');
  Route.get(
    '/fetchLessonsByModuleId',
    'LessonController.fetchLessonsByModuleId'
  );

  Route.get('/modules/getUserModules', 'ModuleController.getUserModules');
  Route.get('/modules/:id', 'ModuleController.getModule');
  Route.get('/lessons/getUserLessons', 'LessonController.getUserLessons');
  Route.post(
    '/lessons/updateUserLesson',
    'LessonController.updateUserLessonInstance'
  );
  Route.post(
    '/modules/updateUserModule',
    'ModuleController.updateUserModuleInstance'
  );

  Route.post('/feedback', 'FeedbackController.createFeedback');
  Route.get('/feedback/getFeedback', 'FeedbackController.getFeedback');
  Route.get(
    '/feedback/export/user-:userId-feedback.txt',
    'FeedbackController.exportFeedback'
  );
})
  .prefix('/api/v1')
  .middleware(['auth']);

Route.group(() => {
  Route.get('/courses', 'CourseController.index');
  Route.get('/courses/:courseId/modules', 'CourseController.getCourseModules');

  Route.get(
    '/feedback/export/user-:userId-feedback.txt',
    'FeedbackController.exportFeedback'
  );
}).prefix('/api/v1');
