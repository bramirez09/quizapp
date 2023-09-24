const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Quiz {
    id: ID!
    title: String!
    questions: [Question!]!
  }

  type Question {
    id: ID!
    text: String!
    answers: [Answer!]!
    correctAnswer: Answer!
  }

  type Answer {
    id: ID!
    text: String!
  },
  type Auth {
    token: ID!,
    user: User
  }
type Query {
    me: User
}
type User {
    _id: ID!
    username: String!
    email: String!
}
`;

module.exports = typeDefs;
