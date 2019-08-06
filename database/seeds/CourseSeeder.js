'use strict'

/*
|--------------------------------------------------------------------------
| ModuleSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Database = use('Database')

class CourseSeeder {
  async run () {
    await Database
    .from('courses')
    .insert([
      { title: '1Life Digital Academy' },
      { title: 'My 1Life Roadmap Journal' },
    ])
  }
}

module.exports = CourseSeeder
