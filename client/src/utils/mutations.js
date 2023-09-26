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
`;

