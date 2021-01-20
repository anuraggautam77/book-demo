import { gql, query } from 'apollo-boost';

const COMMON_MOVIE_DATA = gql`
	fragment MovieCommon on MovieType {
		voteavg
		movieid
		path
		title
		isadult
		genre
		company
		language
		country
		overview
		backdrop
	}
`;

const getUserDetail = gql`
	mutation($id: ID) {
		isuservalid(id: $id) {
			userid
		}
	}
`;

const getRecentlyViewed = gql`
	query($sid:String! , $crmid: String!, $uid: String ) {
		recentlyViewed(sid:$sid ,crmid:$crmid, uid:$uid) {
			 ...MovieCommon
		}
	}
	${COMMON_MOVIE_DATA}
`;

const getRecommendations = gql`
	query($sid:String! , $crmid: String!, $uid: String ) {
		recommendations(sid:$sid ,crmid:$crmid, uid:$uid) {
			 ...MovieCommon
		}
	}
	${COMMON_MOVIE_DATA}
`;

const getInterestedIn = gql`
	query($sid:String! , $crmid: String!, $uid: String ) {
		interestedIn(sid:$sid ,crmid:$crmid, uid:$uid) {
			 ...MovieCommon
		}
	}
	${COMMON_MOVIE_DATA}
`;

const getBasedOnActivity = gql`
	query($sid:String! , $crmid: String!, $uid: String ) {
		basedOnActivity(sid:$sid ,crmid:$crmid, uid:$uid) {
			 ...MovieCommon
		}
	}
	${COMMON_MOVIE_DATA}
`;

const getMovierated = gql`
	query($id: ID!) {
		contextmovierated(id: $id) {
			 ...MovieCommon
		}
	}
	${COMMON_MOVIE_DATA}
`;

const getFirsttopgenre = gql`
query ($id: ID!){
	firstTopGen (id: $id){
		...MovieCommon
	}
}
${COMMON_MOVIE_DATA}
`;

const getSecondtopgenre = gql`
	query ($id: ID!){
		secTopGen (id: $id){
			...MovieCommon
		}
	}
	${COMMON_MOVIE_DATA}
`;

const getOrderbyscore = gql`
	query ($id: ID!){
		orderByScore (id: $id){
			...MovieCommon
		}
	}
	${COMMON_MOVIE_DATA}
`;

const getFirstRecommendation = gql`
query ($id: ID!){
	firstRecommendation (id: $id){
		...MovieCommon
		src_title
	}
}
${COMMON_MOVIE_DATA}
`;

const getSecondRecommendation = gql`
query ($id: ID!){
	secondRecommendation (id: $id){
		...MovieCommon
		 src_title
	}
}
${COMMON_MOVIE_DATA}
`;

const getThirdRecommendation = gql`
query ($id: ID!){
	thirdRecommendation (id: $id){
		...MovieCommon
		 src_title
	}
}
${COMMON_MOVIE_DATA}
`;

const getCollaborativeRecommendation = gql`
query ($id: ID!){
	collaborativeRecommendation (id: $id){
		...MovieCommon
	}
}
${COMMON_MOVIE_DATA}
`;

const getPearsonSimilarity = gql`
query ($id: ID!){
	pearsonSimilarity (id: $id){
		...MovieCommon
	}
}
${COMMON_MOVIE_DATA}
`;

const getPageScroll = gql`
	query($first: Int!, $email: String!, $limit: Int!) {
		onPageScroll(first: $first, email: $email, limit: $limit) {
			parameter_type
			parameter
			crew_job
			results {
				voteavg
				movieid
				path
				title
			}
		}
	}
`;

const getAffinityData = gql`
	query($email: String!) {
		getAffinity(email: $email) {
			parameter_type
			parameter
			crew_job
			results {
				voteavg
				movieid
				path
				title
			}
		}
	}
`;

export {
	getUserDetail,
	getMovierated,
	getFirsttopgenre,
	getSecondtopgenre,
	getOrderbyscore,
	getFirstRecommendation,
	getSecondRecommendation,
	getThirdRecommendation,
	getCollaborativeRecommendation,
	getPearsonSimilarity,
	getRecentlyViewed,
	getRecommendations,
	getInterestedIn,
	getBasedOnActivity,
	getPageScroll,
	getAffinityData
};
