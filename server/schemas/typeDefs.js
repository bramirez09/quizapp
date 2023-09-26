const { gql } = require('apollo-server-express');

const typeDefs = gql`

type User {
    _id: ID!
    username: String!
    email: String!
}
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
}

type Auth {
    token: ID!,
    user: User
}

type Query {
    me: User
}
`;

module.exports = typeDefs;