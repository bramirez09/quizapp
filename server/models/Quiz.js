const { Schema, model } = require('mongoose');
// const dateFormat = require('../utils/dateFormat');

const quizSchema = new Schema({
  question: {
    type: String,
    required: true
  },
  answers: [
    {
      type: String,
      trim: true,
    },
  ],
  correct_answer: {
      type: String 
  },
});

const Quiz = model('Quiz', quizSchema);

module.exports = Quiz;
