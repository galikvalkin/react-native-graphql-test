import gql from 'graphql-tag';


export const ALL_USERS_QUERY = gql`
  query allUsers {
    allUsers {
      id,
      username
    }
  }
`;

export const GET_USER_BY_NAME = gql`
  query getUserByName($username: String!) {
    getUserByName(username: $username) {
      id,
      username
    }
  }
`;

export const GET_USER_BY_ID = gql`
  query getUserById($id: Int!) {
    getUserById(id: $id) {
      id,
      username
    }
  }
`;
