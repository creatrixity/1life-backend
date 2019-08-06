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
      { module_id: 1, title: 'My 1Life Balance Wheel', type: 'tool' },
      { module_id: 1, title: 'My DISC Index', type: 'tool' },
      { module_id: 1, title: 'My Miracle Morning', type: 'tool' },
      { module_id: 1, title: 'Who am I?: Wrap Up' },
      
      { module_id: 2, title: 'My Magnificent Future! Turning Dreams into Reality' },      
      { module_id: 2, title: 'My 1Life Fully Lived Portrait', type: 'tool' },      
      { module_id: 2, title: 'Discover Your Deepest WHYs', type: 'tool' },      
      { module_id: 2, title: 'My Personal Board of Directors', type: 'tool' },      
      { module_id: 2, title: 'My Transition Story', type: 'tool' },      
      { module_id: 2, title: 'My Magnificent Future: Wrap up' },      
      { module_id: 2, title: 'Next Time…' },
      
      { module_id: 3, title: 'My Plan4Me! Journey Preparation' },
      { module_id: 3, title: 'My DISC Index', type: 'tool' },
      { module_id: 3, title: 'Let’s Make Some Plans', type: 'tool' },
      { module_id: 3, title: '1 Year Plan', type: 'tool' },
      { module_id: 3, title: 'Putting It All Together', type: 'tool' },
      { module_id: 3, title: 'My Plan4Me Wrap up', type: 'tool' },
      { module_id: 3, title: 'Next Time…' },
      
      { module_id: 4, title: 'Welcome to Finances!' },
      { module_id: 4, title: 'Financial Mindset', type: 'tool' },
      { module_id: 4, title: 'My Financial ABCs', type: 'tool' },
      { module_id: 4, title: 'Maximizing My Income', type: 'tool' },
      { module_id: 4, title: 'Financial Offense: Wrap up' },
      { module_id: 4, title: 'Next Time…' },
      
      { module_id: 5, title: 'Module 5: Financial Defense' },
      { module_id: 5, title: 'Creating a Budget!', type: 'tool' },
      { module_id: 5, title: 'Debt Reduction and Investment Basics', type: 'tool' },
      { module_id: 5, title: 'Sprint and Marathon Plan', type: 'tool' },
      { module_id: 5, title: 'Module 5: Wrap up' },
      { module_id: 5, title: 'Next time…' },
      
      { module_id: 6, title: 'Fit For My Future!' },
      { module_id: 6, title: 'Fuel for My Future', type: 'tool' },
      { module_id: 6, title: 'The Magnificence of Movement', type: 'tool' },
      { module_id: 6, title: 'Mindset', type: 'tool' },
      { module_id: 6, title: 'Sleep and Systems for Success', type: 'tool' },
      { module_id: 6, title: 'Wrap up Module 6' },
      { module_id: 6, title: 'Final Thoughts – for now!' },
      
      { module_id: 7, title: 'How To Use It' },
      { module_id: 7, title: 'My 1Life Roadmap Goals' },
      { module_id: 7, title: 'My 1Life Motivations' },

      { module_id: 8, title: 'My Dream 4 Me' },
      { module_id: 8, title: 'Who Am I At My Core?' },
      { module_id: 8, title: 'Thriving In My Environment' },
      { module_id: 8, title: 'My Relationship With Me' },
      { module_id: 8, title: 'Develop My Fulfilling Future' },
      { module_id: 8, title: 'The 1Life Fulfilment Triangle' },
      { module_id: 8, title: 'Going Inside The Engine' },
      
      { module_id: 9, title: 'My Dream 4 Me' },
      { module_id: 9, title: 'Vision Planning: My Dream 4 Me' },
      { module_id: 9, title: 'Who is my tribe?' },
      { module_id: 9, title: 'Thriving in my environment' },
      { module_id: 9, title: 'Funding My Magnificent Future' },
      { module_id: 9, title: 'My 1Life Finance ABCs' },
      { module_id: 9, title: 'Healthy In My Mind, Body and Spirit' },
      { module_id: 9, title: 'Fueling my Future' },
    ])
  }
}

module.exports = LessonSeeder
