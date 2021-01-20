module.exports = MovieController = (driver) => ({
	WITH_CONTEXT: {
		getMovieRated: (args) => {
			const query = `MATCH (u:User{user_id:${args.id}})-[:RATED]->(m:Media{media_type:'movie'})
				WHERE NOT EXISTS(m.r_flag) WITH m MATCH
				(m)-[:RELEASED_ON]->(rdate) RETURN m.media_id as movieid,m.title as title,
				m.poster_path as path,rdate.date as date,m.glob_vote_average as vote_avg
				ORDER BY date(date) DESC`;

			return queryrun(driver, query).then((data) => data).catch((error) => console.log(error));
		},

		getfirstTopGen: (args) => {
			const query = `MATCH (:User{user_id:${args.id}})-[:RATED]->(fm:Media{media_type:'movie'})-[r:IS_OF_GENRE]->(genre:Genre)
			WHERE NOT EXISTS(fm.r_flag)
			WITH genre.name as genre,count(r) as m_count ORDER BY m_count DESC
			WITH COLLECT([genre])[0][0] as c_genre
			MATCH (u:User{user_id:${args.id}}),(:Genre{name:c_genre})<-[:IS_OF_GENRE]-(m:Media{media_type:'movie'})
			WHERE NOT EXISTS(m.r_flag) WITH m,u,c_genre MATCH
			(m)-[:RELEASED_ON]->(rdate:Release_Date) WHERE NOT EXISTS((u)-[:RATED]->(m))
			WITH m,[c_genre] as genre,rdate.date as date RETURN m.media_id as movieid,
			m.title as title,genre,m.poster_path as path,date,
			m.glob_vote_average as vote_avg ORDER BY vote_avg DESC LIMIT 10`;
			return queryrun(driver, query).then((data) => data).catch((error) => console.log(error));
		},
		getSecTopGen: (args) => {
			const query = `MATCH (:User{user_id:${args.id}})-[:RATED]->(fm:Media{media_type:'movie'})-[r:IS_OF_GENRE]->(genre:Genre)
			WHERE NOT EXISTS(fm.r_flag)
			WITH genre.name as genre,count(r) as m_count ORDER BY m_count DESC
			WITH COLLECT([genre])[1][0] as c_genre
			MATCH (u:User{user_id:${args.id}}),(:Genre{name:c_genre})<-[:IS_OF_GENRE]-(m:Media{media_type:'movie'})
			WHERE NOT EXISTS(m.r_flag) WITH m,u,c_genre MATCH
			(m)-[:RELEASED_ON]->(rdate:Release_Date) WHERE NOT EXISTS((u)-[:RATED]->(m))
			WITH m,[c_genre] as genre,rdate.date as date RETURN m.media_id as movieid,
			m.title as title,genre,m.poster_path as path,date,
			m.glob_vote_average as vote_avg ORDER BY vote_avg DESC LIMIT 10`;
			return queryrun(driver, query).then((data) => data).catch((error) => console.log(error));
		},
		getOrderByScore: (args) => {
			const query = `MATCH (u:User{user_id:${args.id}})-[r:RATED]->(m:Media{media_type:'movie'}),
			(m)-[:IS_OF_GENRE]->(g:Genre)<-[:IS_OF_GENRE]-(rec:Media{media_type:'movie'})
			WHERE NOT EXISTS(m.r_flag) AND NOT EXISTS(rec.r_flag) WITH rec,u,g MATCH
			(rec)-[:RELEASED_ON]->(rdate:Release_Date) WHERE NOT EXISTS((u)-[:RATED]->(rec))
			WITH rec,rdate,[g.name, COUNT(*)] AS scores 
			WITH rec,rdate,REDUCE (s=0,x in COLLECT(scores)|s+x[1])
			AS score ORDER BY score DESC LIMIT 10 
			RETURN rec.media_id as movieid,rec.title as title,
			rec.poster_path as path,rdate.date AS date,
			rec.glob_vote_average as vote_avg,score ORDER BY vote_avg DESC`;
			return queryrun(driver, query).then((data) => data).catch((error) => console.log(error));
		},
		getFirstRecommendation: (args) => {
			const query = `MATCH (u:User{user_id:${args.id}})-[:RATED]->(m:Media{media_type:'movie'})
			WHERE NOT EXISTS(m.r_flag) WITH m.media_id as id,
			m.glob_vote_average as vote_avg ORDER BY vote_avg DESC
			WITH COLLECT([id])[0][0] as c_id
			MATCH (m:Media{media_id:c_id,media_type:'movie'})
			-[:IS_IN_LANGUAGE|:ACTOR|:IS_OF_GENRE|:IS_PRODUCED_IN_COUNTRY|
			:IS_PRODUCED_BY_COMPANY]->(t)<-[:IS_IN_LANGUAGE|:IS_OF_GENRE|
			:IS_PRODUCED_IN_COUNTRY|:IS_PRODUCED_BY_COMPANY]
			-(other:Media{media_type:'movie'})
			WITH m, other, COUNT(t) AS intersection, COLLECT(t.name) AS i
			MATCH (m)-[:IS_IN_LANGUAGE|:IS_OF_GENRE|:IS_PRODUCED_IN_COUNTRY|
			:IS_PRODUCED_BY_COMPANY]-(mt) WITH m,other, intersection,i,
			COLLECT(mt.name) AS s1 MATCH (other)-[:IS_IN_LANGUAGE|:IS_OF_GENRE|
			:IS_PRODUCED_IN_COUNTRY|:IS_PRODUCED_BY_COMPANY]
			-(ot) WITH m,other,intersection,i, s1,
			COLLECT(ot.name) AS s2 WITH m,other,intersection,s1,s2
			WITH m,other,intersection,
			s1+filter(x IN s2 WHERE NOT x IN s1) AS union, s1, s2
			WITH m,other,((1.0*intersection)/SIZE(union)) AS jaccard
			MATCH (other)-[:RELEASED_ON]->(rdate:Release_Date)
			WHERE NOT EXISTS(other.r_flag)
			WITH m,other,jaccard,rdate ORDER BY jaccard DESC LIMIT 10
			RETURN m.title as src_title,other.media_id as movieid,other.title as title,
			other.poster_path as path,other.glob_vote_average as vote_avg,
			rdate.date as date,jaccard ORDER BY vote_avg DESC`;
			return queryrun(driver, query).then((data) => data).catch((error) => console.log(error));
		},

		getSecondRecommendation: (args) => {
			const query = `MATCH (u:User{user_id:${args.id}})-[:RATED]->(m:Media{media_type:'movie'})
            WHERE NOT EXISTS(m.r_flag) WITH m.media_id as id,
			m.glob_vote_average as vote_avg ORDER BY vote_avg DESC
			WITH COLLECT([id])[1][0] as c_id
			MATCH (m:Media{media_id:c_id,media_type:'movie'})
			-[:IS_IN_LANGUAGE|:ACTOR|:IS_OF_GENRE|:IS_PRODUCED_IN_COUNTRY|
			:IS_PRODUCED_BY_COMPANY]->(t)<-[:IS_IN_LANGUAGE|:IS_OF_GENRE|
			:IS_PRODUCED_IN_COUNTRY|:IS_PRODUCED_BY_COMPANY]
			-(other:Media{media_type:'movie'})
			WITH m, other, COUNT(t) AS intersection, COLLECT(t.name) AS i
			MATCH (m)-[:IS_IN_LANGUAGE|:IS_OF_GENRE|:IS_PRODUCED_IN_COUNTRY|
			:IS_PRODUCED_BY_COMPANY]-(mt) WITH m,other, intersection,i,
			COLLECT(mt.name) AS s1 MATCH (other)-[:IS_IN_LANGUAGE|:IS_OF_GENRE|
			:IS_PRODUCED_IN_COUNTRY|:IS_PRODUCED_BY_COMPANY]
			-(ot) WITH m,other,intersection,i, s1,
			COLLECT(ot.name) AS s2 WITH m,other,intersection,s1,s2
			WITH m,other,intersection,
			s1+filter(x IN s2 WHERE NOT x IN s1) AS union, s1, s2
			WITH m,other,((1.0*intersection)/SIZE(union)) AS jaccard
			MATCH (other)-[:RELEASED_ON]->(rdate:Release_Date)
			WHERE NOT EXISTS(other.r_flag)
			WITH m,other,jaccard,rdate ORDER BY jaccard DESC LIMIT 10
			RETURN m.title as src_title,other.media_id as movieid,other.title as title,
			other.poster_path as path,other.glob_vote_average as vote_avg,
			rdate.date as date,jaccard ORDER BY vote_avg DESC`;
			return queryrun(driver, query).then((data) => data).catch((error) => console.log(error));
		},

		getThirdRecommendation: (args) => {
			const query = `MATCH (u:User{user_id:${args.id}})-[:RATED]->(m:Media{media_type:'movie'})
            WHERE NOT EXISTS(m.r_flag) WITH m.media_id as id,
			m.glob_vote_average as vote_avg ORDER BY vote_avg DESC
			WITH COLLECT([id])[2][0] as c_id
			MATCH (m:Media{media_id:c_id,media_type:'movie'})
			-[:IS_IN_LANGUAGE|:ACTOR|:IS_OF_GENRE|:IS_PRODUCED_IN_COUNTRY|
			:IS_PRODUCED_BY_COMPANY]->(t)<-[:IS_IN_LANGUAGE|:IS_OF_GENRE|
			:IS_PRODUCED_IN_COUNTRY|:IS_PRODUCED_BY_COMPANY]
			-(other:Media{media_type:'movie'})
			WITH m, other, COUNT(t) AS intersection, COLLECT(t.name) AS i
			MATCH (m)-[:IS_IN_LANGUAGE|:IS_OF_GENRE|:IS_PRODUCED_IN_COUNTRY|
			:IS_PRODUCED_BY_COMPANY]-(mt) WITH m,other, intersection,i,
			COLLECT(mt.name) AS s1 MATCH (other)-[:IS_IN_LANGUAGE|:IS_OF_GENRE|
			:IS_PRODUCED_IN_COUNTRY|:IS_PRODUCED_BY_COMPANY]
			-(ot) WITH m,other,intersection,i, s1,
			COLLECT(ot.name) AS s2 WITH m,other,intersection,s1,s2
			WITH m,other,intersection,
			s1+filter(x IN s2 WHERE NOT x IN s1) AS union, s1, s2
			WITH m,other,((1.0*intersection)/SIZE(union)) AS jaccard
			MATCH (other)-[:RELEASED_ON]->(rdate:Release_Date)
			WHERE NOT EXISTS(other.r_flag)
			WITH m,other,jaccard,rdate ORDER BY jaccard DESC LIMIT 10
			RETURN m.title as src_title,other.media_id as movieid,other.title as title,
			other.poster_path as path,other.glob_vote_average as vote_avg,
			rdate.date as date,jaccard ORDER BY vote_avg DESC`;
			return queryrun(driver, query).then((data) => data).catch((error) => console.log(error));
		},

		getCollaborativeRecommendation: (args) => {
			const query = `MATCH (u:User {user_id:${args.id}})-[r:RATED]->(fm:Media{media_type:'movie'})
			WHERE NOT EXISTS(fm.r_flag) WITH u, avg(r.rating) AS mean
			MATCH (u)-[r:RATED]->(m:Media{media_type:'movie'})-[:IS_OF_GENRE]->(g:Genre)
			WHERE NOT EXISTS(m.r_flag) AND r.rating > mean
			WITH u, g, COUNT(*) AS score
			MATCH (g)<-[:IS_OF_GENRE]-(rec:Media)
			WHERE NOT EXISTS((u)-[:RATED]->(rec))
			AND NOT EXISTS(rec.r_flag) WITH g,rec,score
			MATCH (rec)-[:RELEASED_ON]->(rdate:Release_Date)
			WITH rec,rdate,COLLECT(DISTINCT g.name) AS genre,
			SUM(score) AS sscore ORDER BY sscore DESC LIMIT 10
			RETURN rec.media_id as movieid,rec.title AS title,rdate.date as date,
			rec.glob_vote_average as vote_avg,rec.poster_path as path,
			rec.backdrop_path as backdrop,
			sscore ORDER BY vote_avg DESC`;
			return queryrun(driver, query).then((data) => data).catch((error) => console.log(error));
		},

		getPearsonSimilarity: (args) => {
			const query = `MATCH (u1:User{user_id: ${args.id}})-[r:RATED]->(fm:Media{media_type:'movie'})
			WHERE NOT EXISTS(fm.r_flag) WITH u1, avg(r.rating) AS u1_mean
			MATCH (u1)-[r1:RATED]->(fm2:Media{media_type:'movie'})<-[r2:RATED]-(u2)
			WHERE NOT EXISTS(fm2.r_flag)
			WITH u1, u1_mean, u2, COLLECT({r1: r1, r2: r2}) AS ratings
			WHERE size(ratings) > 1 MATCH (u2)-[r:RATED]->(fm3:Media{media_type:'movie'})
			WHERE NOT EXISTS(fm3.r_flag)
			WITH u1, u1_mean, u2, avg(r.rating) AS u2_mean, ratings
			UNWIND ratings AS r WITH sum((r.r1.rating-u1_mean)*(r.r2.rating-u2_mean)) AS nom,
			sqrt(sum((r.r1.rating-u1_mean)^2)*sum((r.r2.rating- u2_mean)^2)) AS denom,
			u1, u2 WHERE denom <> 0 WITH u1, u2, nom/denom AS pearson
			ORDER BY pearson DESC LIMIT 100
			MATCH (u2)-[r:RATED]->(m:Media) WHERE NOT EXISTS((u1)-[:RATED]->(m))
			AND NOT EXISTS(m.r_flag) WITH pearson,r,m
			MATCH (m)-[:RELEASED_ON]->(rdate:Release_Date)
			WITH m,rdate,SUM(pearson * r.rating) AS score
			ORDER BY score DESC LIMIT 10
			RETURN m.media_id as movieid,m.title AS title,rdate.date as date,
			m.glob_vote_average as vote_avg,m.poster_path as path
			ORDER BY vote_avg DESC`;
			return queryrun(driver, query).then((data) => data).catch((error) => error);
		},

		getlatestViewedMovies: (args) => {
			if (args.length > 0) {
				const query = `UNWIND [${args}] as mId OPTIONAL MATCH (m:Media{media_id:mId}) WHERE NOT EXISTS(m.r_flag) WITH m RETURN m.title as title, m.media_id as movieid, m.poster_path as path, m.glob_vote_average as voteavg, m.glob_vote_count as votecount`;
				return queryrun(driver, query)
					.then((data) => {
						var filtered = data.filter(function(el) {
						//	console.log(el)
							if (el.movieid !== null) {
								return el;
							}
						});

						return filtered;
					})
					.catch((error) => error);
			} else {
				return new Promise((resolve) => resolve([]));
			}
		}
	},

	/** withou context page queries */

	WITHOUT_CONTEXT: {
		getMoviedetail: (args) => {
			const query = `MATCH (m:Media{media_type:'movie',media_id:${args.id}})
			WITH m OPTIONAL MATCH
			(m)-[:IS_IN_LANGUAGE]->(language),(m)-[:RELEASED_ON]->(rdate),
			(m)-[:IS_OF_GENRE]->(genre),(m)-[:IS_PRODUCED_BY_COMPANY]->(comp),
			(m)-[:IS_PRODUCED_IN_COUNTRY]->(ctry),(actor)-[arel:ACTOR]->(m),
			(crew)-[j:CREW_MEMBER]->(m)
			WHERE j.job in ['Director','Producer','Writer']
			WITH m,language,rdate,genre,comp,ctry,actor,crew,j ORDER BY arel.order
			WITH m,language,rdate,COLLECT(DISTINCT genre.name) as genre,
			COLLECT(DISTINCT comp.name) as company,
			COLLECT(DISTINCT ctry.name) as country,
			COLLECT(DISTINCT {name:actor.name,image:actor.profile_image}) as actors,
			{name:crew.name,image:crew.profile_image,job:COLLECT(DISTINCT j.job)} AS crew_items
			RETURN m.title as title, language.name as language,m.media_id as movieid,
			rdate.date as date,genre,company,country,actors,COLLECT(crew_items) as crew,
			m.adult as isadult,m.overview as overview,m.popularity as popularity,
			m.poster_path as path,m.backdrop_path as backdrop,
			m.runtime as runtime,m.tagline as tagline,
			m.glob_vote_average as voteavg,m.glob_vote_count as votecount`;

			//console.log(query);
			return queryrun(driver, query).then((data) => data).catch((error) => console.log(error));
		},

		getMovies: () => {
			const query = `MATCH (m:Media)-[:IS_IN_LANGUAGE]->(language),(m)-[:RELEASED_ON]->(rdate),
            (m)-[:IS_OF_GENRE]->(genre),(m)-[:IS_PRODUCED_BY_COMPANY]->(comp),
            (m)-[:IS_PRODUCED_IN_COUNTRY]->(ctry),(actor)-[:ACTOR]->(m),
            (crew)-[j:CREW_MEMBER]->(m)
            WITH m,language,rdate,COLLECT(DISTINCT genre.name) as genre,
            COLLECT(DISTINCT comp.name) as company,
            COLLECT(DISTINCT ctry.name) as country,
            COLLECT(DISTINCT {name:actor.name,image:actor.profile_image}) as actors,
            COLLECT(DISTINCT {name:crew.name,image:crew.profile_image,job:j.job}) AS crew
            RETURN 
            m.media_id as movieid,
            m.title as title,
            language.name as language,
            rdate.date as date,
            genre,
            company,
            country,
            actors,
            crew,
            m.adult as isadult,
            m.overview as overview,
            m.popularity as popularity,
            m.poster_path as path,
            m.runtime as runtime,
            m.tagline as tagline,
            m.glob_vote_average as voteavg,
            m.glob_vote_count as votecount`;
			return queryrun(driver, query).then((data) => data).catch((error) => console.log(error));
		},

		getPopularity: () => {
			const query = `MATCH (m:Media)-[:RELEASED_ON]->(rdate),
            (m)-[:IS_OF_GENRE]->(genre)
            WHERE NOT EXISTS(m.r_flag)
            WITH m,rdate,COLLECT(DISTINCT genre.name) as genre
            RETURN 
            m.title as title,
            m.media_id as movieid,
            rdate.date as date,
            genre,
            m.poster_path as path,
            m.glob_vote_average as voteavg,
            m.glob_vote_count as votecount
            ORDER BY m.popularity DESC LIMIT 10`;
			return queryrun(driver, query).then((data) => data).catch((error) => console.log(error));
		},

		getToprated: () => {
			const query = `MATCH (m:Media)-[:IS_IN_LANGUAGE]->(language),
            (m)-[:RELEASED_ON]->(rdate),(m)-[:IS_OF_GENRE]->(genre)
            WHERE NOT EXISTS(m.r_flag) AND m.glob_vote_count > 50
            WITH m,language,rdate,COLLECT(DISTINCT genre.name) as genre
            RETURN 
            m.title as title,
            m.media_id as movieid,
            language.name as language,
            rdate.date as date,
            genre,
            m.poster_path as path,
            m.glob_vote_average as voteavg,
            m.glob_vote_count as votecount
            ORDER BY voteavg DESC LIMIT 10`;
			return queryrun(driver, query).then((data) => data).catch((error) => console.log(error));
		},

		getLatestMovies: () => {
			const query = `MATCH (m:Media{media_type:'movie'})-[:RELEASED_ON]->(rdate:Release_Date)
            WHERE NOT EXISTS(m.r_flag)
            WITH m,rdate.date as date RETURN m.media_id as movieid,
			m.title as title,m.poster_path as path, 
			m.backdrop_path as backdrop,
			date,
            m.glob_vote_average as voteavg
            ORDER BY date(date) DESC LIMIT 20
            `;
			return queryrun(driver, query).then((data) => data).catch((error) => console.log(error));
		},

		getTopFirstgenMovie: (args) => {
		//	console.log(args.context);
			let query = `MATCH (genre:Genre)<-[r:IS_OF_GENRE]-(fm:Media{media_type:'movie'})
            WHERE NOT EXISTS(fm.r_flag)
            WITH genre.name as genre,count(r) as m_count ORDER BY m_count DESC
            WITH COLLECT([genre])[0][0] as c_genre
            MATCH (:Genre{name:c_genre})<-[:IS_OF_GENRE]-(m:Media{media_type:'movie'}),
            (m)-[:RELEASED_ON]->(rdate:Release_Date)
            WHERE NOT EXISTS(m.r_flag)
            WITH m,[c_genre] as genre,rdate.date as date RETURN m.media_id as movieid,
            m.title as title,genre,m.poster_path as path,date,
            m.glob_vote_average as voteavg
			ORDER BY voteavg DESC LIMIT 10`;

			if (args.context !== 'null') {
				query = `MATCH (:User{email:'${args.context}'})-[:PREFERRED_GENRE]->(genre:Genre)
				WITH genre MATCH (fm:Media{media_type:'movie'})-[r:IS_OF_GENRE]->(genre)
				WHERE NOT EXISTS(fm.r_flag)
				WITH genre,count(r) as m_count ORDER BY m_count DESC
				WITH COLLECT([genre.name])[0][0] as c_genre
				MATCH (:Genre{name:c_genre})<-[:IS_OF_GENRE]-(m:Media{media_type:'movie'})
				WHERE NOT EXISTS(m.r_flag) WITH m,c_genre MATCH
				(m)-[:RELEASED_ON]->(rdate:Release_Date)
				WITH m,[c_genre] as genre,rdate.date as date RETURN m.media_id as movieid,
				m.title as title,genre,m.poster_path as path,date,
				m.glob_vote_average as vote_avg ORDER BY vote_avg DESC LIMIT 10`;
			}
			return queryrun(driver, query).then((data) => data).catch((error) => console.log(error));
		},

		getTopSecondgenMovie: (args) => {
			let query = `MATCH (genre:Genre)<-[r:IS_OF_GENRE]-(fm:Media{media_type:'movie'})
            WHERE NOT EXISTS(fm.r_flag)
            WITH genre.name as genre,count(r) as m_count ORDER BY m_count DESC
            WITH COLLECT([genre])[1][0] as c_genre
            MATCH (:Genre{name:c_genre})<-[:IS_OF_GENRE]-(m:Media{media_type:'movie'}),
            (m)-[:RELEASED_ON]->(rdate:Release_Date)
            WHERE NOT EXISTS(m.r_flag)
            WITH m,[c_genre] as genre,rdate.date as date RETURN m.media_id as movieid,
            m.title as title,genre,m.poster_path as path,date,
            m.glob_vote_average as voteavg
            ORDER BY voteavg DESC LIMIT 10`;
			if (args.context !== 'null') {
				query = `MATCH (:User{email:'${args.context}'})-[:PREFERRED_GENRE]->(genre:Genre)
WITH genre MATCH (fm:Media{media_type:'movie'})-[r:IS_OF_GENRE]->(genre)
WHERE NOT EXISTS(fm.r_flag)
WITH genre,count(r) as m_count ORDER BY m_count DESC
WITH COLLECT([genre.name])[1][0] as c_genre
MATCH (:Genre{name:c_genre})<-[:IS_OF_GENRE]-(m:Media{media_type:'movie'})
WHERE NOT EXISTS(m.r_flag) WITH m,c_genre MATCH
(m)-[:RELEASED_ON]->(rdate:Release_Date)
WITH m,[c_genre] as genre,rdate.date as date RETURN m.media_id as movieid,
m.title as title,genre,m.poster_path as path,date,
m.glob_vote_average as vote_avg ORDER BY vote_avg DESC LIMIT 10`;
			}

			return queryrun(driver, query).then((data) => data).catch((error) => console.log(error));
		}
	},

	MUTATION_QUERY: {
		getUpdateRating: (arg) => {
			const query = `MATCH (n:Media)  WHERE n.media_id =${arg.movieid} set n.glob_vote_average =${arg.voteavg} , n.glob_vote_count =${arg.votecount} return n.media_id as movieid ,n.glob_vote_average as voteavg, n.glob_vote_count as votecount`;
			return queryrun(driver, query).then((data) => data).catch((error) => error);
		}
	},

	SUBSCRIPTION_QUERY: {
		ratingUpdate: () => {}
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
