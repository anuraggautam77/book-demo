const { AccountController } = require('../controllers');

module.exports = () => ({
	Mutation: {
		signupUser: (root, params, { User }) => {
			return AccountController.register(params);
		},

		signinUser: (root, params, { User }) => {
			return AccountController.signIn(params);
		},

		forgotPassword: (root, params, {header}) => {
			 return AccountController.forgotPassword(params, header.origin);
		}
	}
});
