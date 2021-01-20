const { PubSub } = require('apollo-server');
const pubsub = new PubSub();
const { MovieController } = require('../controllers/index');

module.exports = () => ({
	Query: {
		moviedetail: (parent, args, { cache }) => {
			return MovieController.WITHOUT_CONTEXT.getMoviedetail(args);
		},

		movies: (parent, args, {}) => {
			return MovieController.WITHOUT_CONTEXT.getMovies(args);
		},

		popularity: (parent, args, {}) => {
			return MovieController.WITHOUT_CONTEXT.getPopularity(args);
		},

		toprated: (parent, args, {}) => {
			return MovieController.WITHOUT_CONTEXT.getToprated(args);
		},

		latestMovies: (parent, args, {}) => {
			return MovieController.WITHOUT_CONTEXT.getLatestMovies(args);
		},

		topFirstgenMovie: (parent, args, {}) => {
			return MovieController.WITHOUT_CONTEXT.getTopFirstgenMovie(args);
		},

		topSecondgenMovie: (parent, args, {}) => {
			return MovieController.WITHOUT_CONTEXT.getTopSecondgenMovie(args);
		}
	},
	Mutation: {
		updateRating: (parent, { movieid, voteavg, votecount }, { client }, info) => {
			return MovieController.MUTATION_QUERY.getUpdateRating({ movieid, voteavg, votecount });
			 
		}
	},
	Subscription: {
		ratingUpdate: {
			//subscribe: () => pubsub.asyncIterator('UPDATE_RATING')
		}
	}
});
