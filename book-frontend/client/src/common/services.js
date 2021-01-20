import axios from 'axios';
axios.defaults.timeout = 30000;
axios.defaults.baseURL = '';

const recSearch = axios.create({});

axios.interceptors.request.use(
	(config) => {
		return config;
	},
	(err) => {
		return Promise.reject(err);
	}
);
export function get(url, params = {}) {
	return new Promise((resolve, reject) => {
		axios
			.get(url, {
				params: params
			})
			.then((response) => {
				resolve(response.data);
			})
			.catch((err) => {
				reject(err);
			});
	});
}

/*
 * post 
 * */
export function post(url, data = {}) {
	return new Promise((resolve, reject) => {
		axios.post(url, data).then((response) => {
			resolve(response.data);
		});
	});
}

/**
 * put 
 * */
export function put(url, data = {}) {
	return new Promise((resolve, reject) => {
		axios.put(url, data).then((response) => {
			resolve(response.data);
		});
	});
}

/*
 * patch  
 * */
export function patch(url, data = {}) {
	return new Promise((resolve, reject) => {
		axios.patch(url, data).then((response) => {
			resolve(response.data);
		});
	});
}

export function registerUser(data) {
	return axios({
		url: '/register',
		method: 'POST',
		data: data
	});
}

export function loginUser(data) {
	return axios({
		url: '/login',
		method: 'POST',
		data: data
	}).catch((err) => {
		return err;
	});
}

export function activateUser(token) {
	console.log(token);
	return axios({
		url: `/activateUser?jwt=${token.jwt}`,
		method: 'GET'
	});
}

export function forgotpassword(email) {
	return axios({
		url: `/forgotPwd?userId=${email}`,
		method: 'GET'
	});
}

export function resetpassword(data) {
	return axios({
		url: `/resetPwd`,
		method: 'POST',
		data: data
	});
}

export function getUserInfo(email) {
	return axios({
		url: `/getProfile?userId=${email}`,
		method: 'GET'
	});
}

export function postUserDetail(obj) {
	return axios({
		url: `/updateProfile`,
		method: 'POST',
		data: obj
	});
}

export function getLanguages() {
	return axios({
		url: `/getLanguages`,
		method: 'GET'
	});
}

export function getGenres() {
	return axios({
		url: `/getGenres`,
		method: 'GET'
	});
}

export function searchtext(text) {
	return axios({
		baseURL: '',
		url: `/getSearchResults?key=${text}`,
		method: 'GET'
	});
}
