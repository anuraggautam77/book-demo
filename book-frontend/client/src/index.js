import React from 'react';
import ReactDOM from 'react-dom';

import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import "./style/vendor/bootstrap/index.scss"
import App from './App';


// Creating HTTP END POINT Using APOLLO LINK
//const protocol = location.hostname == 'localhost' ? 'http' : 'http';
const protocol = 'https';

const httpLink = new HttpLink({
	uri: ` http://localhost:9081/graphql`
});

// Establish Apollo client/ Store for appication which wraps whole Application
const client = new ApolloClient({
	link: httpLink,
	credentials: 'same-origin',
	cache: new InMemoryCache(),
	connectToDevTools: true,
	headers: {
		'Content-Type': `application/json`,
		Accept: `application/json`
	}
});

ReactDOM.render(
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>,
	document.getElementById('app-root')
);
