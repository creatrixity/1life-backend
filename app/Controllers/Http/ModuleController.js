'use strict';

const Lesson = use('App/Models/Lesson');
const Module = use('App/Models/Module');
const UserLesson = use('App/Models/UserLesson');
const UserModule = use('App/Models/UserModule');

class ModuleController {
  async getModule({ params }) {
    const { id } = params;

    const module = await Module.query()
      .where({ id })
      .with('lessons')
      .withCount('lessons')
      .fetch();

    return module;
  }

  /**
   * Gets data for the module
   *
   * @param {*} request
   * @param {*} response
   * @param {*} params
   * @param {*} view
   */
  async fetchModuleLessonView({ request, view }) {
    const { lessonId, moduleSlug, courseSlug } = request.only([
      'lessonId',
      'moduleSlug',
      'courseSlug'
    ]);

    const renderPath =
      lessonId && Number(lessonId) !== 0
        ? `modules.${courseSlug}.${moduleSlug}.lesson-${lessonId}`
        : `modules.${courseSlug}.${moduleSlug}.index`;

    return view.render(renderPath);
  }

  /**
   * Returns the modules the user has interacted with.
   *
   * @param {Object<Request>} request
   * @param {Object<Auth>} request
   */
  async getUserModules({ request, auth }) {
    const user = await auth.getUser();
    const { courseId } = request.only(['courseId']);

    const result = await UserModule.query()
      .where({
        user_id: user.id,
        course_id: courseId
      })
      .fetch();

    return result;
  }
}

module.exports = ModuleController;
