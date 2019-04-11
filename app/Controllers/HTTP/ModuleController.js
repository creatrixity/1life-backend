"use strict";

const Helpers = use('Helpers')
const Module = use("App/Models/Module");
const UserLesson = use("App/Models/UserLesson");
const UserModule = use("App/Models/UserModule");

class ModuleController {
  _computeModulesProgression (lessons, lessonsCount) {
    const totalProgressions = lessons.reduce((previousTotalProgression, currentLesson) => {
      return (previousTotalProgression) + currentLesson.progression
    }, 0);
    
    return totalProgressions / lessonsCount;  
  }

  async index({ params }) {

    const { id } = params

    const module = await Module.find(id);
    const lessons = await module.lessons().fetch(['id', 'module_id', 'title']);

    return {
      module,
      lessons
    };
  }

  /**
   * Gets data for the module
   * 
   * @param {*} request
   * @param {*} response
   * @param {*} params
   * @param {*} view
   */
  async getModuleData({ request, view }) {
    const {
      id,
      module
    } = request.only(['id', 'module'])

    const renderPath = id ? `modules.${module}.lesson-${id}` : `modules.${module}.index`;

    return view.render(renderPath)
  }

  /**
   * Returns the lessons the user has interacted with.
   * 
   * @param {Object<Request>} request
   * @param {Object<Auth>} request
   */
  async getUserLessons({ request, auth }) {
    const {
      userId,
      moduleId
    } = request.only(['moduleId', 'userId'])

    return await UserLesson
      .query()
      .where({
        module_id: moduleId,
        user_id: userId
      })
      .fetch();
  }

  /**
   * Returns the modules the user has interacted with.
   * 
   * @param {Object<Request>} request
   * @param {Object<Auth>} request
   */
  async getUserModules({ request, auth }) {
    const {
      userId
    } = request.only(['userId'])

    return await UserModule
      .query()
      .where({
        user_id: userId
      })
      .fetch();
  }

  /**
   * Updates the lesson the user has interacted with.
   * 
   * @param {Object<Request>} request
   * @param {Object<Auth>} request
   */
  async updateUserLessonInstance ({ request, auth }) {
    // If we currently have no user lesson, create one.
    // If we have a user lesson, update with the new data
    const {
      moduleId,
      lessonId,
      lessonsCount,
      progression
    } = request.only(['moduleId', 'lessonId', 'progression', 'lessonsCount'])

    const user = await auth.getUser();
    
    let userLessons;

    // Do any user lessons match these parameters?
    const userLessonsCount = await UserLesson
      .query()
      .where({
        lesson_id: lessonId,
        module_id: moduleId,
        user_id: user.id
      })
      .getCount();

    // If we have found a lesson matching the params, we update that lesson and return all lessons in the module.
    // Else, we create a lesson with the provided params.
    if (userLessonsCount > 0) {      
      // Update the lesson.
      await UserLesson
        .query()
        .where({
          lesson_id: lessonId,
          module_id: moduleId,
          user_id: user.id
        })
        .update({
          progression
        })

      userLessons = await UserLesson
        .query()
        .where({
          module_id: moduleId,
          user_id: user.id
      })
      .fetch()

      await UserModule
      .query()
      .where({
        module_id: moduleId,
        user_id: user.id,
      })
      .update({
        progression: this._computeModulesProgression(userLessons.toJSON(), lessonsCount)
      })
    } else {
      // Create the lesson.
      await UserLesson.findOrCreate({
        lesson_id: lessonId,
        module_id: moduleId,
        user_id: user.id,
        progression
      })

      userLessons = await UserLesson
      .query()
      .where({
        module_id: moduleId,
        user_id: user.id
      })
      .fetch()

      if (userLessons.toJSON().length <= 1){
        await UserModule.create({
          module_id: moduleId,
          user_id: user.id,
          progression: 0
        })
      } else {
        await UserModule
        .query()
        .where({
          module_id: moduleId,
          user_id: user.id,
        })
        .update({
          progression: this._computeModulesProgression(userLessons.toJSON(), lessonsCount)
        })  
      }

      userLessons = await UserLesson
      .query()
      .where({
        module_id: moduleId,
        user_id: user.id
      })
      .fetch()

    }

    return userLessons
  }
}

module.exports = ModuleController;
