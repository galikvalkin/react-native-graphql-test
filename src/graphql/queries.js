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

// getUserByName: (parent, { username }, { models }) =>
//       models.User.findOne({
//         where: {
//           username,
//         },
//       }),
//     getUserById: (parent, { id }, { models }) =>
//       models.User.findById(id),
//     userBoards: (parent, { owner }, { models }) =>
//       models.Board.findAll({
//         where: {
//           owner,
//         },
//       }),
//     userSuggestions: (parent, { creatorId }, { models }) =>
//       models.Suggestion.findAll({
//         where: {
//           creatorId,
//         },
//       }),
