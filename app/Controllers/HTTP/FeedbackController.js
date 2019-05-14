"use strict";

const UserFeedback = use("App/Models/UserFeedback");
const UserModule = use("App/Models/UserModule");

class FeedbackController {
  async createFeedback({ request }) {
    const {
			answer,
			question,
			user_id,
			course_id,
			module_id,
			lesson_id,
			feedback_id
    } = request.all()

    const queryParams = {
			user_id,
			course_id,
			module_id,
			lesson_id,
			feedback_id
    }

    let feedbackCount = await UserFeedback.query().where(queryParams).getCount();
    
    if (feedbackCount) {
      await UserFeedback
        .query()
        .where(queryParams)
        .update({
          answer,
          question,
          ...queryParams
        })
    }
    
    return await UserFeedback.findOrCreate({
      answer,
      question,
      ...queryParams
    });
  }

  async getFeedback({ request }) {
    const {
			user_id,
			course_id,
			module_id,
			lesson_id
    } = request.all()

    const queryParams = {
			user_id,
			course_id,
			module_id,
			lesson_id,
    }

    return await UserFeedback.query().where(queryParams).fetch();    
  }
}

module.exports = FeedbackController;
