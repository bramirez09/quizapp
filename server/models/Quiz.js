const { Schema, model } = require('mongoose');

const answerSchema = new Schema({
    text: {
      type: String,
      required: true
    }
  });
  
  const questionSchema = new Schema({
    text: {
      type: String,
      required: true
    },
    answers: {
      type: [answerSchema],
      required: true
    },
    correctAnswer: {
      type: answerSchema,
      required: true
    }
  });
  
  const quizSchema = new Schema({
    title: {
      type: String,
      required: true
    },
    questions: {
      type: [questionSchema],
      required: true
    }
  });
  
  const Quiz = model('Quiz', quizSchema);
  
  module.exports = Quiz;