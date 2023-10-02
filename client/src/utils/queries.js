import { gql } from '@apollo/client';

export const QUERY_QUIZ = gql`
  query quizzes {
    quizzes {
      _id
      question
      answers
      correct_answer
      totalScore
    }
  }
`;

export const QUERY_USER = gql `
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      totalScore
    }
  }
`

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      totalScore
    }
  }
`;
