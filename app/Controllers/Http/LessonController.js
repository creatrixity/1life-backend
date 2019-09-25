'use strict';

const Helpers = use('Helpers');
const Lesson = use('App/Models/Lesson');
const Module = use('App/Models/Module');
const UserLesson = use('App/Models/UserLesson');
const UserModule = use('App/Models/UserModule');

function _calcModulesProgression(lessons, lessonsCount) {
  const totalProgressions = lessons.reduce(
    (previousTotalProgression, currentLesson) => {
      return previousTotalProgression + currentLesson.progression;
    },
    0
  );

  return totalProgressions / lessonsCount;
}

class LessonsController {
  /**
   * Returns the lessons the user has interacted with.
   *
   * @param {Object<Request>} request
   * @param {Object<Auth>} request
   */
  async fetchLessonsByModuleId({ request, auth }) {
    const { moduleId } = request.only(['moduleId']);

    return await Lesson.query()
      .where({ module_id: moduleId })
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
    let { courseId, lessonId, moduleId } = request.only([
      'courseId',
      'lessonId',
      'moduleId'
    ]);
    const course_id = courseId;
    const lesson_id = lessonId;
    const module_id = moduleId;

    const user = await auth.getUser();
    const user_id = user.id;

    const moduleLessonsCount = await Lesson.query()
      .where({ module_id })
      .getCount();

    const userLesson = await UserLesson.query()
      .where({ lesson_id, module_id, user_id })
      .getCount();

    if (!userLesson) {
      // Create the lesson
      await UserLesson.findOrCreate({
        lesson_id,
        module_id,
        user_id
      });
    }

    let userLessons = await UserLesson.query()
      .where({ user_id, module_id })
      .fetch();

    const lessonsCount = await Lesson.query()
      .where({ module_id })
      .getCount();

    const progression = _calcModulesProgression(
      userLessons.toJSON(),
      lessonsCount
    );

    const userModule = await UserModule.findOrCreate({
      course_id,
      module_id,
      user_id
    });

    await UserModule.query()
      .where({ course_id, module_id, user_id, id: userModule.id })
      .update({ progression });

    return {
      userLessons,
      moduleLessonsCount
    };
  }

  /**
   * Returns the lessons the user has interacted with.
   *
   * @param {Object<Request>} request
   * @param {Object<Auth>} request
   */
  async getUserLessons({ request, auth }) {
    const { moduleId } = request.only(['moduleId']);
    const user = await auth.getUser();

    const userLessons = await UserLesson.query()
      .where({ user_id: user.id, module_id: moduleId })
      .fetch();

    const moduleLessonsCount = await Lesson.query()
      .where({ module_id: moduleId })
      .getCount();

    return {
      userLessons,
      moduleLessonsCount
    };
  }
}

module.exports = LessonsController;
