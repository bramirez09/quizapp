const Quiz = require('../models/Quiz');
const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
      quizzes: async () => {
        return await Quiz.find({})
      },
      quiz: async (parent, { quizId }) => {
        return Quiz.findOne({ _id: quizId });
      },

    },
    Query: {

      me: async (parent, args, context) => {
        // checksif users exists
        if (context.user) {
          const userData = await User.findOne({ _id: context.user.id })
          .select('__v - password');
  
          return userData;
        }
        throw new AuthenticationError("Must be logged in!")
      },
    },
  
    Mutation: {
  
      addUser: async (parent, { username, email, password }) => {
        const user = await User.create({ username, email, password });
        const token = signToken(user);
  
        return { token, user };
      },
  
      login: async (parent, { email, password }) => {
        const user = await User.findOne({ email });
        // check if user exists with email and credentials
        if (!user) {
            throw new AuthenticationError("User not found");
        }
        const correctPassword = await user.isCorrectPassword(password);
  
        // check password
        if (!correctPassword) {
            throw new AuthenticationError("Incorrect credentials");
        }
        const token = signToken(user);
        return { token, user };
      },
      
  
    },
  
  };

module.exports = resolvers;
