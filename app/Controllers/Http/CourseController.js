'use strict';

const Course = use('App/Models/Course');
const Module = use('App/Models/Module');

class CourseController {
  async index({ request }) {
    const { fetch } = request.all();
    let courses;

    if (fetch) {
      courses = await Course.query()
        .withCount('modules')
        .with(fetch)
        .fetch();
    } else {
      courses = await Course.query()
        .withCount('modules')
        .fetch();
    }

    return courses;
  }

  async getCourseModules({ params }) {
    const modules = await Module.query()
      .where('course_id', params.courseId)
      .withCount('lessons')
      .fetch();

    return modules;
  }
}

module.exports = CourseController;
