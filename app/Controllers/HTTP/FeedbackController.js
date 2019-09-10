'use strict';

const Feedback = use('App/Models/Feedback');
// const UserFeedback = use('App/Models/UserFeedback');
const LessonFeedback = use('App/Models/LessonFeedback');

function generateAnswer(answer, type) {
  if (type === 'rating') return `${answer} (on a scale of 1 - 5)`;

  if (type === 'checkbox') {
    return answer === 'on' ? 'I agree' : 'nope';
  }

  return answer;
}

class FeedbackController {
  async createFeedback({ request }) {
    const {
      answer,
      question,
      type,
      user_id,
      course_id,
      module_id,
      lesson_id,
      feedback_id
    } = request.all();

    const queryParams = {
      user_id,
      type,
      course_id,
      module_id,
      lesson_id,
      feedback_id
    };

    const updateQueryCriteria = {
      // user_id: queryParams.user_id,
      type: queryParams.type,
      // lesson_id: queryParams.lesson_id,
      serial_id: queryParams.feedback_id
    };
    // Handle feedback duplicates.
    // If we have the same exact feedback, make updates.
    // Else, we create a new feedback.
    let feedbackCount = await Feedback.query()
      .where(updateQueryCriteria)
      .getCount();

    if (feedbackCount) {
      await Feedback.query()
        .where(updateQueryCriteria)
        .update({
          answer,
          question,
          ...updateQueryCriteria
        });
    }

    const feedback = await Feedback.findOrCreate({
      answer,
      question,
      creator_id: user_id,
      ...updateQueryCriteria
    });

    if (!feedbackCount) {
      await LessonFeedback.findOrCreate({
        feedback_id: feedback.id,
        lesson_id,
        creator_id: user_id
      });
    }

    return feedback;
  }

  async getFeedback({ request }) {
    const { user_id, course_id, module_id, lesson_id } = request.all();

    const queryParams = {
      lesson_id,
      creator_id: user_id
    };

    const lessonFeedbacks = await LessonFeedback.query()
      .where(queryParams)
      .with('feedbacks')
      .fetch();

    const feedbacks = lessonFeedbacks.toJSON().map(({ feedbacks }) => {
      return { ...feedbacks[0] };
    });

    return feedbacks;
  }

  async exportFeedback({ request, response, params }) {
    const { courseId } = request.only(['courseId']);
    const { userId } = params;

    const feedbackEntries = await Feedback.query()
      .where({ creator_id: userId })
      .fetch();

    if (feedbackEntries.toJSON().length) {
      response.type('application/text');

      return feedbackEntries
        .toJSON()
        .map((feedback, i) => {
          const { answer, type, question } = feedback;

          let feedbackAnswer = generateAnswer(answer, type);

          return `
          Question: ${question}\r\n
          Answer: ${feedbackAnswer}
        `;
        })
        .join('\r\n\r\n');
    }

    return `The user with id: ${userId} is yet to give any feedback`;
  }
}

module.exports = FeedbackController;
