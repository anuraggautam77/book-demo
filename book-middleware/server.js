const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
var morgan = require('morgan');
const app = express();
const http = require('http');
const { SubscriptionServer } = require('subscriptions-transport-ws');
const { ApolloServer } = require('apollo-server-express');

const schema = require('./schema');
const resolvers = require('./resolvers')();

const port = process.env.PORT || 9081;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '50MB' }));

// make directory Static


//app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
/*
const serverApollo = new ApolloServer({
	typeDefs: schema,
	resolvers,
	tracing: true,
	cacheControl: {
		defaultMaxAge: 600 // 10 min
	},
	debug: true
});

// logger for every request

serverApollo.applyMiddleware({ app, path: '/graphql' });

const httpServer = http.createServer(app);
serverApollo.installSubscriptionHandlers(httpServer);



const server = httpServer.listen(port, function() {
	console.log('Express server listening on port ' + port);
});
*/

const server = new ApolloServer({
	typeDefs: schema,
	resolvers,
	context: ({ req }) => ({
		header: req.headers
	})
});

server.applyMiddleware({
	app
});

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen(port, () => {
	console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`);
	console.log(`Subscriptions ready at ws://localhost:${port}${server.subscriptionsPath}`);
});

module.exports = app;
