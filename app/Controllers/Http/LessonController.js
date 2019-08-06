"use strict";

const Lesson = use('App/Models/Lesson');

class LessonsController {
  /**
   * Returns the lessons the user has interacted with.
   * 
   * @param {Object<Request>} request
   * @param {Object<Auth>} request
   */
  async fetchLessonsByModuleId({ request, auth }) {
    const { moduleId } = request.only(['moduleId'])

    return await Lesson
      .query()
      .where({ module_id: moduleId })
      .fetch();
  }
}

module.exports = LessonsController;
