"use strict";

const UserFeedback = use("App/Models/UserFeedback");
const UserModule = use("App/Models/UserModule");

function generateAnswer(answer, type) {
  if (type === 'rating') return `${answer} (on a scale of 1 - 5)`;

  if (type === 'checkbox') {
    return answer === 'on' ? 'I agree': 'nope';
  }

  return answer
}

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

  async exportFeedback({ request, response, params }) {

    const { courseId } = request.only(['courseId'])
    const { userId } = params;

    const feedbackEntries = await UserFeedback.query().where({ user_id: userId, course_id: courseId }).fetch();

    if (feedbackEntries.toJSON().length) {
      response.type('application/text')

      return feedbackEntries.toJSON().map((feedback, i) => {
        const { answer, type, question } = feedback;
  
        let feedbackAnswer = generateAnswer(answer, type);
  
        return `
          Question: ${question}\r\n
          Answer: ${feedbackAnswer}
        `
      }).join('\r\n\r\n');  
    }
    
    return `The user with id: ${userId} is yet to give any feedback`;
  }
}

module.exports = FeedbackController;
