module.exports = UserController = (driver) => ({
	getUserDetail: (args) => {
		const query = `MATCH (n:User)  WHERE n.user_id=${args.id}  RETURN n.user_id as userid`;
		return queryrun(driver, query).then((data) => data).catch((error) => console.log(error));
	}
});

const queryrun = function(driver, query) {
	return new Promise((resolve, reject) => {
		try {
			driver.cypher({ query }, (error, results) => {
				if (error) {
					return reject(error);
				}
				resolve(results);
			});
		} catch (error) {
			console.error(error);
			// expected output: ReferenceError: nonExistentFunction is not defined
			// Note - error messages will vary depending on browser
		}
	});
};
