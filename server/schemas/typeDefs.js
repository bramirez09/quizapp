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
    correct_answer: Int
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
type Mutation { 
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;