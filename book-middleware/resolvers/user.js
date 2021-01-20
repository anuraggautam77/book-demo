const { combineResolvers } = require('graphql-resolvers');
const { AuthenticationError, UserInputError } = require('apollo-server');
const { MovieController, UserController } = require('../controllers/index');
const request = require('request');

const service_url = 'https://rec-recently-viewed-dot-leoburnett-altria-185831.appspot.com/getRecentlyViewedIds?';
const recommendations_url = 'https://rec-recommendations-dot-leoburnett-altria-185831.appspot.com/getRecommendedIds?';

const basedOnactivity_url =
	'https://rec-recommendations-dot-leoburnett-altria-185831.appspot.com/getActivityRecommendations?';
const interestedin_url = 'https://rec-recommendations-dot-leoburnett-altria-185831.appspot.com/getProbableInterests?';
const affinity_url = `https://rec-recommendations-dot-leoburnett-altria-185831.appspot.com/getAffinityRecommendations?`;
const getPreference = `https://rec-recommendations-dot-leoburnett-altria-185831.appspot.com/getPreferenceRecommendations?`;

//Based on you activity - /getActivityRecommendations
//You may be interested in - /getProbableInterests

module.exports = () => ({
	Query: {
		contextmovierated: (parent, args, { cleint }) => {
			return MovieController.WITH_CONTEXT.getMovieRated(args);
		},
		firstTopGen: (parent, args, { cleint }) => {
			return MovieController.WITH_CONTEXT.getfirstTopGen(args);
		},

		secTopGen: (parent, args, { cleint }) => {
			return MovieController.WITH_CONTEXT.getSecTopGen(args);
		},

		orderByScore: (parent, args, { cleint }) => {
			return MovieController.WITH_CONTEXT.getOrderByScore(args);
		},

		firstRecommendation: (parent, args, { cleint }) => {
			return MovieController.WITH_CONTEXT.getFirstRecommendation(args);
		},

		secondRecommendation: (parent, args, { cleint }) => {
			return MovieController.WITH_CONTEXT.getSecondRecommendation(args);
		},

		thirdRecommendation: (parent, args, { cleint }) => {
			return MovieController.WITH_CONTEXT.getThirdRecommendation(args);
		},

		collaborativeRecommendation: (parent, args, { cleint }) => {
			return MovieController.WITH_CONTEXT.getCollaborativeRecommendation(args);
		},

		pearsonSimilarity: (parent, args, { cleint }) => {
			return MovieController.WITH_CONTEXT.getPearsonSimilarity(args);
		},

		getAffinity: (parent, args, { cleint }) => {
			console.log(`${affinity_url}crmid=${args.email}`);
			return new Promise(function(resolve, reject) {
				request(
					{
						url: `${affinity_url}crmid=${args.email}`,
						method: 'GET',
						headers: {
							'Content-Type': ' application/json'
						}
					},
					function(error, response, body) {
						resolve(response);
					}
				);
			}).then((data) => {
				const response = JSON.parse(data.body);
				if (response && response.data && response.data.length > 0) {
					return response.data;
				} else {
					return null;
				}
			});
		},

		onPageScroll: (parent, args, { cleint }) => {
			console.log(`${getPreference}crmid=${args.email}&skip=${args.first}&limit=${args.limit}`);
			return new Promise(function(resolve, reject) {
				request(
					{
						url: `${getPreference}crmid=${args.email}&skip=${args.first}&limit=${args.limit}`,
						method: 'GET',
						headers: {
							'Content-Type': ' application/json'
						}
					},
					function(error, response, body) {
						resolve(response);
					}
				);
			}).then((data) => {
				const response = JSON.parse(data.body);
				if (response && response.data && response.data.length > 0) {
					return response.data;
				} else {
					return null;
				}
			});
		},

		recentlyViewed: (parent, args, { cleint }) => {
			return new Promise(function(resolve, reject) {
				request(
					{
						url: `${service_url}sid=${args.sid}&crmid=${args.crmid}&uid=${args.uid}`,
						method: 'GET',
						headers: {
							'Content-Type': ' application/json'
						}
					},
					function(error, response, body) {
						resolve(response);
					}
				);
			}).then((data) => {
				const movieDetails = MovieController.WITH_CONTEXT.getlatestViewedMovies(JSON.parse(data.body).data);
				return movieDetails.then((movies) => movies);
			});
		},

		recommendations: (parent, args, { cleint }) => {
			return new Promise(function(resolve, reject) {
				request(
					{
						url: `${recommendations_url}sid=${args.sid}&crmid=${args.crmid}&uid=${args.uid}`,
						method: 'GET',
						headers: {
							'Content-Type': ' application/json'
						}
					},
					function(error, response, body) {
						resolve(response);
					}
				);
			}).then((data) => {
				const movieDetails = MovieController.WITH_CONTEXT.getlatestViewedMovies(JSON.parse(data.body).data);
				return movieDetails.then((movies) => movies);
			});
		},

		basedOnActivity: (parent, args, { cleint }) => {
			return new Promise(function(resolve, reject) {
				request(
					{
						url: `${basedOnactivity_url}sid=${args.sid}&crmid=${args.crmid}&uid=${args.uid}`,
						method: 'GET',
						headers: {
							'Content-Type': ' application/json'
						}
					},
					function(error, response, body) {
						//console.log(response.data)
						resolve(response);
					}
				);
			}).then((data) => {
				const movieDetails = MovieController.WITH_CONTEXT.getlatestViewedMovies(JSON.parse(data.body).data);

				return movieDetails.then((movies) => movies);
			});
		},
		interestedIn: (parent, args, { cleint }) => {
			return new Promise(function(resolve, reject) {
				request(
					{
						url: `${interestedin_url}sid=${args.sid}&crmid=${args.crmid}&uid=${args.uid}`,
						method: 'GET',
						headers: {
							'Content-Type': ' application/json'
						}
					},
					function(error, response, body) {
						resolve(response);
					}
				);
			}).then((data) => {
				const movieDetails = MovieController.WITH_CONTEXT.getlatestViewedMovies(JSON.parse(data.body).data);
				return movieDetails.then((movies) => movies);
			});
		}
	},

	Mutation: {
		isuservalid: (parent, args, { cleint }) => {
			return UserController.getUserDetail(args);
		}
	}
});
