const { gql } = require('apollo-server-express');

module.exports = gql`
	extend type Query {
		contextmovierated(id: ID!): [MovieType!]
		firstTopGen(id: ID!): [MovieType!]
		secTopGen(id: ID!): [MovieType!]
		orderByScore(id: ID!): [MovieType!]
		firstRecommendation(id: ID!): [MovieType!]
		secondRecommendation(id: ID!): [MovieType!]
		thirdRecommendation(id: ID!): [MovieType!]
		collaborativeRecommendation(id: ID!): [MovieType!]
		pearsonSimilarity(id: ID!): [MovieType!]
		recentlyViewed(sid: String, crmid: String, uid: String): [MovieType]
		recommendations(sid: String, crmid: String, uid: String): [MovieType]
		basedOnActivity(sid: String, crmid: String, uid: String): [MovieType]
		interestedIn(sid: String, crmid: String, uid: String): [MovieType]
		onPageScroll(first: Int, email: String, limit: Int): [SectionData]
		getAffinity(email: String): [SectionData]
	}

	extend type Mutation {
		isuservalid(id: ID!): [userType]
	}

	type userType {
		userid: Int
	}

	type SectionData {
		parameter_type: String
		parameter: String
		crew_job: String
		results: [BasicDetail]
	}

	type BasicDetail {
		movieid: ID!
		path: String
		voteavg: String
		title: String
			language: String
	}

	type MovieType {
		movieid: ID!
		path: String
		title: String
		isadult: String
		genre: [String]
		language: String
		company: [String]
		country: [String]
		actors: [String]
		crew: [String]
		overview: String
		popularity: String
		runtime: String
		tagline: String
		votecount: String
		date: String
		voteavg: String
		src_title: String
		backdrop: String
	}
`;
