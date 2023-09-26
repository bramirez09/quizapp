const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID!
    username: String!
    email: String!
}
type Quiz {
    _id: ID!
    question: String!
    answers: [String]!
    correctAnswers: Int
  }

type Auth {
    token: ID!,
    user: User
}
type Query {
    me: User
    quizzes: [Quiz]
    quiz(ID: ID!): Quiz!
}
`;

module.exports = typeDefs;