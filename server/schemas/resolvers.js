<<<<<<< HEAD
=======

>>>>>>> origin/Brenda
const Quiz = require('../models/Quiz');

const resolvers = {
    Query: {
      quizzes: async () => {
        return await Quiz.find({})
      },
      quiz: async (parent, { quizId }) => {
        return Quiz.findOne({ _id: quizId });
      },

    },
  };
<<<<<<< HEAD
  module.exports = resolvers;
=======

module.exports = resolvers;
>>>>>>> origin/Brenda
