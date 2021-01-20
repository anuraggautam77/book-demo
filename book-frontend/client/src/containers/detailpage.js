import React, { Component } from 'react';
import '../style/css/detail.scss';

import DetailComponent from '../components/detail';
import { getMovieDetail, updateRating } from '../gql';
import { Query, graphql, compose, ApolloConsumer } from 'react-apollo';

export default class MovieDetails extends Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
	//	document.title = 'Detail Page';
		_recommendations.trackPageLoad({
			entity: {
				id: this.props.match.params.id
			}
		});
	}

	componentDidMount() {}

	render() {
		return (
			<ApolloConsumer>
				{(client) => {
					return (
						<Query query={getMovieDetail} variables={{ id: this.props.match.params.id }}>
							{({ data, loading, error }) => {
								if (loading) return <p />;
								if (error) return <p>ERROR: {error.message}</p>;

								return (
									<section className="banner-sec detail-page">
										<div className="container wrapper-container">
											<div className="row">
												<div className="col-sm-12">
													<DetailComponent movieData={data} />;
												</div>
											</div>
										</div>
									</section>
								);
							}}
						</Query>
					);
				}}
			</ApolloConsumer>
		);
	}
}
