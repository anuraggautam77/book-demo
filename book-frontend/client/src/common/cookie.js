import cookie from 'react-cookies';
export default class Cookie {
	constructor() {}

	setCookie(name, option) {
		cookie.save(name, option.value, { path: '/' });
	}

	getCookie(name) {
		return cookie.load(name);
	}

	removeCookie(name) {
		cookie.remove(name, { domain: window.location.host, path: '/' });
	}
	removeAll() {
		[ 'context', 'lname', 'name', 'sid', 'uid', 'notice' ].map((name) => {
			console.log(name);
			cookie.remove(name, { path: '/' });
		});
	}
}
