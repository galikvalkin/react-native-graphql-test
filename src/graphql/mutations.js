
import gql from 'graphql-tag';

export const SIGNUP = gql`
  mutation signup($username: String!, $password: String!) {
    signup(username: $username, password: $password)
  }
`;

export const SIGNIN = gql`
  mutation signin($username: String!, $password: String!) {
    signin(username: $username, password: $password)
  }
`;

export const CREATE_USER = gql`
  mutation createUser($username: String!, $password: String!) {
    createUser(username: $username, password: $password) {
      id,
      username
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($username: String!, $newUsername: String!) {
    signin(username: $username, newUsername: $newUsername)
  }
`;

export const DELETE_USER_BY_ID = gql`
  mutation deleteUserById($id: Int!) {
    deleteUserById(id: $id)
  }
`;

export const CREATE_BOARD = gql`
  mutation createBoard($owner: Int!, $name: String) {
    createBoard(owner: $owner, name: $name) {
      id,
      name,
    }
  }
`
export const CREATE_SUGGESTION = gql`
  mutation createSuggestion($creatorId: Int!, $text: String, $boardId: Int!) {
    createSuggestion(creatorId: $creatorId, text: $text, boardId: $boardId) {
      id,
      text,
      creator {
        id,
        username
      }
    }
  }
`