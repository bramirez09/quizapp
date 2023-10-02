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
  totalScore: {
    type: Number
  }
  // createdAt: {
  //   type: Date,
  //   default: Date.now,
  //   get: (timestamp) => dateFormat(timestamp),
  // },
});

const Quiz = model('Quiz', quizSchema);

module.exports = Quiz;
