const { Schema, model } = require('mongoose');

const answersSchema = new Schema({
  answerA: {
    type: String,
    required: true
  },
  answerB: {
    type: String,
    required: true
  },
  answerC: {
    type: String,
    required: true
  },
  answerD: {
    type: String,
    required: true
  },
});

const Answers = model('Answers', answersSchema);

module.exports = Answers;