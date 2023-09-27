const { Schema, model } = require('mongoose');

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
      type: Number 
  },
});

const Quiz = model('Quiz', quizSchema);

<<<<<<< HEAD
module.exports = Quiz;
=======
// module.exports = Quiz;
 
export default Quiz
>>>>>>> origin/Brenda
