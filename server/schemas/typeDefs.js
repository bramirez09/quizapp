const { gql } = require('apollo-server-express');

const typeDefs = gql`
<<<<<<< HEAD
=======

>>>>>>> origin/Brenda
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
`;

<<<<<<< HEAD
=======

>>>>>>> origin/Brenda
module.exports = typeDefs;