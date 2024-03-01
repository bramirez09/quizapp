const Quiz = require('../models/Quiz');
const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
      quizzes: async () => {
        const data = await Quiz.find({})
        console.log(data);
        return data;
      },
      quiz: async (parent, { quizId }) => {
        const data = await Quiz.findOne({ _id: quizId });
        console.log(data);
        return data;
      },
      user: async (parent, { username }) => {
        const data = await User.findOne({ username: username }).populate('scores');
        console.log("user data:", data);
        return data;
      },
      me: async (parent, args, context) => {
        if (context.user) {
          const data = await User.findOne({ username: context.user.username })
          console.log(data);
          return data;
        }
        throw new AuthenticationError('You need to be logged in!');
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
      addScore: async (parent, { username, scores }, context) => {
        if (context.user) {
          return User.findOneAndUpdate(
            { username: username },
            {
              $addToSet: { scores: scores },
            },
          );
        }
      },
  
    },
  };

module.exports = resolvers;
