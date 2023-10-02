// intitial setup for Apollo Client for React
import { gql } from '@apollo/client'

// User login controlers
export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
    token
    user {
      _id
      username
    }
  }
}
`

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
      addUser(username: $username, email: $email, password: $password) {
        token
        user {
          _id
          username
          email
        }
      }
    }
`;


export const DELETE_USER = gql`
    mutation deleteUser($username: String!) {
      deleteUser(username: $username) {
        username
      }
    }
`;



export const UPDATE_SCORE = gql`
mutation updateScore($totalScore: Int!) {
  updateScore(totalScore: $totalScore) {
    _id
    totalScore
  }
}
`;