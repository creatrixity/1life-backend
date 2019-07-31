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

class ModuleSeeder {
  async run () {
    await Database
    .from('modules')
    .insert([
      { title: 'Module 1: Who Am I?', course_id: 1 },
      { title: 'Module 2: My Magnificent Future!', course_id: 1 },
      { title: 'Module 3: My Plan4Me!', course_id: 1 },
      { title: 'Module 4: Financial Offense!', course_id: 1 },
      { title: 'Module 5: Financial Defense!', course_id: 1 },
      { title: 'Module 6: Fit For My Future!', course_id: 1 },
      { title: 'Getting Started', course_id: 2 },
      { title: 'First Quarter', course_id: 2 },
      { title: 'Second Quarter', course_id: 2 },
    ])
  }
}

module.exports = ModuleSeeder
