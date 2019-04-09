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
      { title: 'Module 1: Who Am I?' },
      { title: 'Module 2: My Magnificent Future!' },
      { title: 'Module 3: My Plan4Me!' },
      { title: 'Module 4: Financial Offense!' },
      { title: 'Module 5: Financial Defense!' },
      { title: 'Module 6: Fit For My Future!' },
    ])
  }
}

module.exports = ModuleSeeder
