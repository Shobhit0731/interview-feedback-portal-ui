import { gql } from "@apollo/client";

const LOGIN_USER = gql`
  mutation LoginUser($payload: UserInput) {
    loginUser(payload: $payload) {
      token
      email
    }
  }
`;

const REGISTER_USER = gql`
  mutation SignUpUser($payload: User) {
    signUpUser(payload: $payload) {
      new_user {
        name
        email
        _id
      }
    }
  }
`;

const RESET_PASSWORD = gql`
  mutation ResetPasswordUser($payload: ResetInput) {
    resetPasswordUser(payload: $payload) {
      user {
        name
        email
      }
    }
  }
`;

export { LOGIN_USER, REGISTER_USER, RESET_PASSWORD };
