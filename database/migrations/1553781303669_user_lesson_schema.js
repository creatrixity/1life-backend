'use strict';

const Schema = use('Schema');

class UserLessonSchema extends Schema {
  up() {
    if (!this.hasTable('user_lessons')) return;

    this.create('user_lessons', table => {
      table.increments();
      table.integer('user_id');
      table.integer('module_id');
      table.integer('lesson_id');
      table.integer('progression').defaultsTo(0);
      table.timestamps();
    });
  }

  down() {
    this.drop('user_lessons');
  }
}

module.exports = UserLessonSchema;
