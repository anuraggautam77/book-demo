const { gql } = require('apollo-server-express');

module.exports = gql`
	extend type Mutation {
		signupUser(
			firstName: String!
			lastName: String!
			email: String!
			password: String!
			selectedOption: [options!]
			selectedLanguages: [options!]
		): UserDetail
		signinUser(email: String!, password: String!): UserDetail
		forgotPassword(email: String!): message
	}

	input options {
		value: String
		label: String
	}

	type message {
		message: String
	}

	type UserDetail {
		token: String
		firstName: String
		lastName: String
		email: String
		message: String
	}
`;
