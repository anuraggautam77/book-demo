const { gql } = require('apollo-server-express');

module.exports = gql`
	extend type Query {
		movies: [Movie!]
		popularity: [BasicSchema!]
		toprated: [BasicSchema!]
		latestMovies: [BasicSchema!]
		topFirstgenMovie(context: String!): [BasicSchema!]
		topSecondgenMovie(context: String!): [BasicSchema!]
		moviedetail(id: ID!): [Movie!]
	}

	extend type Mutation {
		updateRating(movieid: ID!, voteavg: String, votecount: String): [Rating!]
	}

	extend type Subscription {
		ratingUpdate: [Rating]
	}

	type Rating {
		voteavg: String
		movieid: ID!
		votecount: String
	}

	type BasicSchema {
		title: String
		language: String
		date: String
		genre: [String]
		movieid: ID!
		path: String
		voteavg: String
		backdrop: String
		votecount: String
	}

	type Movie {
		movieid: ID!
		path: String
		title: String
		isadult: String
		genre: [String]
		language: String
		company: [String]
		country: [String]
		actors: [ActorsType!]
		crew: [CrewType!]
		overview: String
		popularity: String
		runtime: String
		tagline: String
		votecount: String
		date: String
		voteavg: String
		backdrop: String
	}

	type ActorsType {
		name: String
		image: String
		id:!id
	}

	type CrewType {
		name: String
		image: String
		job: [String]
	}
`;
