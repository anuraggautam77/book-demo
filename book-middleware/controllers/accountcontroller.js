const bcrypt = require('bcrypt');
const crypto = require('crypto');
const secret = 'password-secret';

const saltRounds = 10;

module.exports = AccountController = (driver) => ({
	register: (objdata) => {
		const validcheck = `Match (u:User) where u.email="${objdata.email}" return u`;
		const hashpass = hashBycrypt(objdata.password);
		return queryrun(driver, validcheck)
			.then((data) => {
				if (data.length > 0) {
					return { message: 'Already have same Account with this email' };
				} else {
					let genList = [];
					if (objdata.selectedOption.length > 0) {
						objdata.selectedOption.map((ob, i) => {
							genList.push(`"${ob.value}"`);
						});
					}

					let langList = [];
					if (objdata.selectedLanguages.length > 0) {
						objdata.selectedLanguages.map((ob, i) => {
							langList.push(`"${ob.value}"`);
						});
					}

					var query = `WITH [${genList}] as pref_genre_list
						UNWIND pref_genre_list as genre_item
						WITH genre_item ORDER BY genre_item
						WITH COLLECT(genre_item) as sorted_genres
						WITH apoc.coll.combinations(sorted_genres, 1, length(sorted_genres)) as combos
						UNWIND combos as combo
						WITH "["+substring(reduce(s="", name in combo | s + "', '" + name),3)+"']" as unwinded_combo
						MATCH (c:Cluster) WHERE c.cluster_id = unwinded_combo 
						WITH c MERGE (u:User{firstName: "${objdata.firstName}",
						lastName:"${objdata.lastName}",email:"${objdata.email}",
						password: "${hashpass}",resetPasswordToken:'',resetPasswordExpires:''})
						MERGE (u)-[:PREFERRED_CLUSTER]->(c)
						WITH u,[${genList}] as pref_genre_list
						UNWIND pref_genre_list as genre_item
						MATCH (g:Genre{name:genre_item})
						MERGE (u)-[:PREFERRED_GENRE]->(g)
						WITH u,[${langList}] as pref_language_list
						UNWIND pref_language_list as lang_item
						MATCH (lang:Language{name:lang_item})
						MERGE (u)-[:PREFERRED_LANGUAGE]->(lang)
						return u.firstName as firstName, u.email as email, u.lastName as lastName`;

				//	console.log(query);

					return queryrun(driver, query)
						.then((data) => {
							if (data.length > 0) {
								return data[0];
							}
						})
						.catch((error) => error);
				}
			})
			.catch((error) => error);
	},
	signIn: (objdata, hashpass) => {
		const getUserDetail = `Match (n:User) where n.email="${objdata.email}" return n.password as password, n.firstName as firstName, n.email as email, n.lastName as lastName  
		`;
		return queryrun(driver, getUserDetail)
			.then((data) => {
				if (data.length > 0) {
					const { firstName, password, lastName, email } = data[0];
					if (comparePass(objdata.password, password)) {
						return { message: null, firstName, lastName, email };
					} else {
						return { message: 'Please Enter a Valid Username and Password !!' };
					}
				} else {
					return { message: 'Please Enter a Valid Username and Password !!' };
				}
			})
			.catch((error) => error);
	},
	forgotPassword: (objdata, origin) => {
		const getUserDetail = `Match (n:User) where n.email="${objdata.email}" return n.password as password, n.firstName as firstName, n.email as email, n.lastName as lastName  
		`;
		return queryrun(driver, getUserDetail)
			.then((data) => {
				if (data.length > 0) {
					const {  email } = data[0];
					const hash = crypto.createHmac('sha256', secret).update(email).digest('hex');
					const updateToken = `Match (n:User) where n.email="${objdata.email}" 
 	 Set  n.resetPasswordToken="${hash}", n.resetPasswordExpires="${Date.now() + 3600000}" 
	return n.password as password, n.firstName as firstName, n.email as email, n.lastName as lastName ,n.resetPasswordToken as passtoken, n.resetPasswordExpires as tokenExpire `;
					return queryrun(driver, updateToken).then((updated) => {
						//console.log(`${origin}/reset/${hash}`);
						return { message: 'A message will be sent to your register email address containing a link to reset your password !' };
					});
				} else {
					return { message: 'Please Enter a Valid Username and Password !!' };
				}
			})
			.catch((error) => error);
	}
});

const hashBycrypt = function(password) {
	return bcrypt.hashSync(password, saltRounds);
};

const comparePass = function(password, dbpassword) {
	return bcrypt.compareSync(password, dbpassword); // true
};

const queryrun = function(driver, query) {
	return new Promise((resolve, reject) => {
		try {
			driver.cypher({ query: query }, function(error, results) {
				if (error) {
					throw error;
				}
				resolve(results);
			});
		} catch (error) {
			resolve(error);
		}
	});
};
