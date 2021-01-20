import { gql, query } from 'apollo-boost';

const getValidateToken = gql`
query {
	isLinkValid {
		message
	}
}
`;


const SIGNUP_USER = gql`
	mutation(
		$firstName: String!
		$lastName: String!
		$email: String!
		$password: String!
		$selectedOption: [options!]
		$selectedLanguages: [options!]
	) {
		signupUser(
			firstName: $firstName
			lastName: $lastName
			email: $email
			password: $password
			selectedOption: $selectedOption
			selectedLanguages: $selectedLanguages
		) {
			firstName
			lastName
			email
			message
		}
	}
`;

const SIGNIN_USER = gql`
	mutation($email: String!, $password: String!) {
		signinUser(email: $email, password: $password) {
			token
			firstName
			lastName
			email
			message
		}
	}
`;

const FORGOT_PASSWORD = gql`
	mutation($email: String!) {
		forgotPassword(email: $email) {
			message
		}
	}
`;

export { SIGNUP_USER, SIGNIN_USER, FORGOT_PASSWORD };
