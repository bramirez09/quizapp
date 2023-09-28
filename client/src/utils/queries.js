import { gql } from '@apollo/client';

export const QUERY_QUIZ = gql`
  query quizzes {
    quizzes {
      _id
      question
      answers
      correct_answer
    }
  }
`;