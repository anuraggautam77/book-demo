const connection = require('../dbconnection');
const driver = connection().getInstance();

const MovieController = require('./moviecontroller');
const UserController = require('./usercontroller');
const AccountController = require('./accountcontroller');
module.exports = {
	UserController: UserController(driver),
	MovieController: MovieController(driver),
	AccountController: AccountController(driver)
};
