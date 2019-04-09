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

class LessonSeeder {
  async run () {
    await Database
    .from('lessons')
    .insert([
      { module_id: 1, title: 'Who am I? Roadmap Journey Starts here!' },
      { module_id: 1, title: 'Tool #1: My 1Life Balance Wheel' },
      { module_id: 1, title: 'Tool #3: My Miracle Morning' },
      { module_id: 1, title: 'Who am I?: Wrap Up' },
      { module_id: 1, title: 'Next time…' },
      { module_id: 2, title: 'My Magnificent Future! Turning Dreams into Reality' },      
      { module_id: 2, title: 'Tool #1: My 1Life Fully Lived Portrait' },      
      { module_id: 2, title: 'Tool #2: Discover Your Deepest WHYs' },      
      { module_id: 2, title: 'Tool #3: My Personal Board of Directors' },      
      { module_id: 2, title: 'Tool #4: My Transition Story' },      
      { module_id: 2, title: 'My Magnificent Future: Wrap up' },      
      { module_id: 2, title: 'Next Time…' },
      { module_id: 3, title: 'My Plan4Me! Journey Preparation' },
      { module_id: 3, title: 'Tool #1: Let’s Make Some Plans' },
      { module_id: 3, title: 'Tool #2: 1 Year Plan' },
      { module_id: 3, title: 'Tool #3: Putting It All Together' },
      { module_id: 3, title: 'Tool #3: My Plan4Me Wrap up' },
      { module_id: 3, title: 'Next Time…' },
      { module_id: 4, title: 'Welcome to Finances!' },
      { module_id: 4, title: 'Tool #1: Financial Mindset' },
      { module_id: 4, title: 'Tool #2: My Financial ABCs' },
      { module_id: 4, title: 'Tool #3: Maximizing My Income' },
      { module_id: 4, title: 'Module 4 Wrap Up!' },
      { module_id: 4, title: 'Next Time…' },
      { module_id: 5, title: 'Module 5: Financial Defense' },
      { module_id: 5, title: 'Tool #1: Creating a Budget!' },
      { module_id: 5, title: 'Tool #2: Debt Reduction and Investment Basics' },
      { module_id: 5, title: 'Tool #3: Sprint and Marathon Plan' },
      { module_id: 5, title: 'Module 5: Wrap up' },
      { module_id: 5, title: 'Next time…' },
      { module_id: 6, title: 'Fit For My Future!' },
      { module_id: 6, title: 'Tool #1: Fuel for My Future' },
      { module_id: 6, title: 'Tool #2: The Magnificence of Movement' },
      { module_id: 6, title: 'Tool #3: Mindset' },
      { module_id: 6, title: 'Tool #4: Sleep and Systems for Success' },
      { module_id: 6, title: 'Wrap up Module 6' },
      { module_id: 6, title: 'Final Thoughts – for now!' },
    ])
  }
}

module.exports = LessonSeeder
