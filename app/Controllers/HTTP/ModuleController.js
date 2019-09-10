'use strict';

const Helpers = use('Helpers');
const Lesson = use('App/Models/Lesson');
const Module = use('App/Models/Module');
const UserLesson = use('App/Models/UserLesson');
const UserModule = use('App/Models/UserModule');

class ModuleController {
  _calcModulesProgression(lessons, lessonsCount) {
    const totalProgressions = lessons.reduce(
      (previousTotalProgression, currentLesson) => {
        return previousTotalProgression + currentLesson.progression;
      },
      0
    );

    return totalProgressions / lessonsCount;
  }

  async getModule({ params }) {
    const { id } = params;

    const module = await Module.query()
      .where({ id })
      .with('lessons')
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
   * Returns the lessons the user has interacted with.
   *
   * @param {Object<Request>} request
   * @param {Object<Auth>} request
   */
  async getUserLessons({ request, auth }) {
    const { userId, moduleId } = request.only(['userId', 'moduleId']);

    const userLessons = await UserLesson.query()
      .where({ user_id: userId, module_id: moduleId })
      .fetch();
    const moduleLessonsCount = await Lesson.query()
      .where({ module_id: moduleId })
      .getCount();

    return {
      userLessons,
      moduleLessonsCount
    };
  }

  /**
   * Returns the modules the user has interacted with.
   *
   * @param {Object<Request>} request
   * @param {Object<Auth>} request
   */
  async getUserModules({ request, auth }) {
    const { userId, courseId } = request.only(['userId', 'courseId']);

    return await UserModule.query()
      .where({
        user_id: userId,
        course_id: courseId
      })
      .fetch();
  }

  /**
   * Updates the lesson the user has interacted with.
   *
   * @param {Object<Request>} request
   * @param {Object<Auth>} request
   */
  async updateUserLessonInstance({ request, response, auth }) {
    // If we currently have no user lesson, create one.
    // If we have a user lesson, update with the new data
    let { courseId, lessonId, moduleId, progression } = request.only([
      'courseId',
      'lessonId',
      'moduleId',
      'progression'
    ]);
    const course_id = courseId;
    const lesson_id = lessonId;
    const module_id = moduleId;

    const user = await auth.getUser();
    const user_id = user.id;

    const userLessonsCount = await UserLesson.query()
      .where({ lesson_id, user_id })
      .getCount();
    const moduleLessonsCount = await Lesson.query()
      .where({ module_id })
      .getCount();

    const hasUserLessons = userLessonsCount > 0;

    // If we have found a lesson matching the params, we update that lesson and return all lessons in the module.
    // Else, we create a lesson with the provided params.
    if (hasUserLessons) {
      // Update the lesson.
      await UserLesson.query()
        .where({ lesson_id, user_id })
        .update({ progression });
    } else {
      // Create the lesson
      await UserLesson.findOrCreate({
        lesson_id,
        module_id,
        user_id,
        progression
      });
    }

    let userLessons = await UserLesson.query()
      .where({ user_id, module_id })
      .fetch();
    const shouldCreateUserModule = userLessons.toJSON().length <= 1;

    console.log({ shouldCreateUserModule });

    if (shouldCreateUserModule) {
      await UserModule.create({
        course_id,
        module_id,
        user_id,
        progression: 0
      });

      return {
        userLessons,
        moduleLessonsCount
      };
    }

    const lessonsCount = await Lesson.query()
      .where({ module_id })
      .getCount();
    progression = this._calcModulesProgression(
      userLessons.toJSON(),
      lessonsCount
    );

    await UserModule.query()
      .where({ course_id, module_id, user_id })
      .update({ progression });

    return {
      userLessons,
      moduleLessonsCount
    };
  }
}

module.exports = ModuleController;
