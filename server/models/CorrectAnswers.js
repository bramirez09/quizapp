const { Schema, model } = require('mongoose');

const correctAnswersSchema = new Schema({
  answerAcorrect: {
    type: Boolean,
    required: true
  },
  answerBcorrect: {
    type: Boolean,
    required: true
  },
  answerCcorrect: {
    type: Boolean,
    required: true
  },
  answerDcorrect: {
    type: Boolean,
    required: true
  }
});

const CorrectAnswers = model('CorrectAnswers', correctAnswersSchema);

module.exports = CorrectAnswers;