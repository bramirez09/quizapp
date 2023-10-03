const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID!
    username: String!
    email: String!
    scores: [String]
}
type Quiz {
    _id: ID!
    question: String!
    answers: [String]!
    correct_answer: String!
  }

type Auth {
    token: ID!,
    user: User
}
type Query {
    me: User
    quizzes: [Quiz]
    quiz(ID: ID!): Quiz!
    user(username: String!): User
}
type Mutation { 
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addScore(username: String!, score: String!): Auth
  }
`;

module.exports = typeDefs;
