'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class AlterUserLessonsSchema extends Schema {
  up() {
    this.table('alter_user_lessons', table => {
      this.raw(
        'ALTER TABLE user_lessons ADD UNIQUE( user_id, module_id, lesson_id);'
      );
    });
  }

  down() {
    this.table('alter_user_lessons', table => {
      // reverse alternations
    });
  }
}

module.exports = AlterUserLessonsSchema;
