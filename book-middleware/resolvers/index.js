module.exports = () => {
	const userResolvers = require('../resolvers/user')();
	const movieResolvers = require('../resolvers/movie')();
	const accountResolvers = require('../resolvers/account')();
	return [ userResolvers, movieResolvers, accountResolvers ];
};
