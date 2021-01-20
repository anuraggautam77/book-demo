import React, { Component, Fragment } from 'react';
import '../style/css/article.scss';

import { getPouplarlity, getTopRated, getlatestMovies, getTopFirstgenMovie, getTopSecondgenMovie } from '../gql';
import { Query } from 'react-apollo';
import _ from 'lodash';

import HeroBanner from '../components/movie/herobanner';
import CategoryComponent from '../components/movie/category';
import PageSlider from '../components/movie/pageSlider';
import SearchContainer from '../containers/searchBox';

class ArtPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showWrapper: 'db'
		};
	}

	componentDidMount() {
		document.title = 'DashBoard Page';
		_recommendations.trackPageLoad();
	}

	hideshowContainer(flag) {
		if (flag) {
			this.setState({ ...this.state, showWrapper: 'db' });
		} else {
			this.setState({ ...this.state, showWrapper: 'dn' });
		}
	}

	render() {
		return (
			<Fragment>
				<section className="banner-sec">
					<div className="container-fluid wrapper-container">
						<div className="row" style={{ marginBottom: '62px' }}>
							<div className="col-sm-12" style={{ margin: 0, padding: 0 }}>
								<SearchContainer onHideShowSearch={(flag) => this.hideshowContainer(flag)} />
							</div>
						</div>
					</div>
					<div className={`page-component  ${this.state.showWrapper}`}>
						<div className="container wrapper-container">
							<div className="main_title_1 md-top">
								<h2>Latest movies</h2>
							</div>
							<div className="c-container-gardient col-md-12">
								<Query query={getlatestMovies}>
									{({ data, loading, error }) => {
										if (loading) return <p>Loading...</p>;
										if (error) {
											console.log(`error in Latest movies : ${error.messgae}`);
										}

										if (data && data.latestMovies && data.latestMovies.length > 0) {
											return <HeroBanner movies={data.latestMovies} />;
										} else {
											return <div />;
										}
									}}
								</Query>
							</div>
						</div>
						<div className="container">
							<div className="row">
								<div className="col-sm-8">
									<Query query={getTopRated}>
										{({ data, loading, error }) => {
											if (loading) return <p />;
											if (error) {
												console.log(`error in getTopRated : ${error.messgae}`);
											}

											if (data && data.toprated && data.toprated.length > 0) {
												return (
													<CategoryComponent
														count={4}
														title={'Top Rated'}
														movies={data.toprated}
													/>
												);
											} else {
												return <div />;
											}
										}}
									</Query>

									<Query query={getPouplarlity}>
										{({ data, loading, error }) => {
											if (loading) return <p />;
											if (error) {
												console.log(`error in Pouplar movies : ${error.messgae}`);
											}

											if (data && data.popularity && data.popularity.length > 0) {
												return (
													<CategoryComponent
														count={4}
														title={'Most Popular'}
														movies={data.popularity}
													/>
												);
											} else {
												return <div />;
											}
										}}
									</Query>
								</div>
								<div className="col-sm-4">
									<Query query={getTopFirstgenMovie} variables={{ context: 'null' }}>
										{({ data, loading, error }) => {
											if (loading) return <p />;
											if (error) {
												console.log(`error in FirstgenMovie : ${error.messgae}`);
											}

											if (data && data.topFirstgenMovie && data.topFirstgenMovie.length > 0) {
												return (
													<CategoryComponent
														count={2}
														title={`Top movies in ${data.topFirstgenMovie[0]['genre'][0]}`}
														movies={data.topFirstgenMovie}
													/>
												);
											} else {
												return <div />;
											}
										}}
									</Query>

									<Query query={getTopSecondgenMovie} variables={{ context: 'null' }}>
										{({ data, loading, error }) => {
											if (loading) return <p />;
											if (error) {
												console.log(`error in SecondgenMovie : ${error.messgae}`);
											}

											if (data && data.topSecondgenMovie && data.topSecondgenMovie.length > 0) {
												return (
													<CategoryComponent
														count={2}
														title={`Top movies in ${data.topSecondgenMovie[0]['genre'][0]}`}
														movies={data.topSecondgenMovie}
													/>
												);
											} else {
												return <div />;
											}
										}}
									</Query>
								</div>
							</div>
						</div>
					</div>
				</section>
			</Fragment>
		);
	}
}

export default ArtPage;
