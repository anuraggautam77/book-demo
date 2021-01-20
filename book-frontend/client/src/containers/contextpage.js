import React, { Component } from 'react';
import '../style/css/article.scss';
import { getlatestMovies } from '../gql';
import { getRecentlyViewed, getBasedOnActivity, getPageScroll, getAffinityData } from '../gql/usercontext';
import cookie from 'react-cookies';
import { Query, graphql } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';
import _ from 'lodash';
import Modal from 'react-modal';

import HeroBanner from '../components/movie/herobanner';
import CategoryComponent from '../components/movie/category';
import SearchContainer from '../containers/searchBox';
import NoMatch from './nomatch';

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
		zIndex: '9999999',
		background: 'rgba(19,35,47)',
		minWidth: '30%',
		minHeight: '200px'
	}
};

class ContextPage extends Component {
	constructor(props) {
		super(props);
		this.pagecount = 1;
		this.limitcount = 1;

		this.state = {
			crmid: cookie.load('context') || null,
			sid: cookie.load('sid') || null,
			uid: cookie.load('uid') || null,
			showWrapper: 'db',
			modalIsOpen: cookie.load('notice') == 'true' ? true : false || false
		};

		this.openModal = this.openModal.bind(this);
		this.afterOpenModal = this.afterOpenModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.handleMore = this.handleMore.bind(this);
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

	openModal() {
		this.setState({ modalIsOpen: true });
	}

	afterOpenModal() {
		// references are now sync'd and can be accessed.
		//	this.subtitle.style.color = '#FFF';
	}

	closeModal() {
		this.setState({ modalIsOpen: false });
		this.props.history.push('/profile');
	}

	render() {
		return (
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
						<Modal
							isOpen={this.state.modalIsOpen}
							onAfterOpen={this.afterOpenModal}
							style={customStyles}
							contentLabel="Example Modal"
							shouldCloseOnOverlayClick={false}
						>
							<NoMatch showpopup={true} />
						</Modal>

						<div className="main_title_1 md-top">
							<h2>New Releases</h2>
						</div>
						<div className="c-container-gardient col-md-12">
							<Query query={getlatestMovies}>
								{({ data, loading, error }) => {
									if (loading) return <p>Loading...</p>;
									if (error) {
										console.log(`error in New Releases : ${error.messgae}`);
									}

									if (data && data.latestMovies && data.latestMovies.length > 3) {
										return <HeroBanner movies={data.latestMovies} />;
									} else {
										return <div />;
									}
								}}
							</Query>
						</div>
					</div>

					<div className="container wrapper-container">
						<Query
							query={getRecentlyViewed}
							variables={{ crmid: this.state.crmid, sid: this.state.sid, uid: this.state.uid }}
							fetchPolicy="cache-and-network"
						>
							{({ data, loading, error }) => {
								if (loading) return <p />;
								if (error) {
									console.log(`error in getRecentlyViewed : ${error.messgae}`);
								}

								if (data && data.recentlyViewed && data.recentlyViewed.length > 0) {
									return (
										<CategoryComponent
											count={5}
											title={'Recently Viewed'}
											movies={data.recentlyViewed}
										/>
									);
								} else {
									return <div />;
								}
							}}
						</Query>
					</div>

					<div className="container wrapper-container">
						<Query
							query={getBasedOnActivity}
							variables={{ crmid: this.state.crmid, sid: this.state.sid, uid: this.state.uid }}
							fetchPolicy="cache-and-network"
						>
							{({ data, loading, error }) => {
								if (loading) return <p />;
								if (error) {
									console.log(`error in Basedonyour activity : ${error.messgae}`);
								}
								if (
									data &&
									'basedOnActivity' in data &&
									data.basedOnActivity &&
									data.basedOnActivity.length > 0
								) {
									return (
										<CategoryComponent
											count={6}
											title={'Recommendations for You'}
											movies={data.basedOnActivity}
										/>
									);
								} else {
									return <div />;
								}
							}}
						</Query>
					</div>

					<div className="container wrapper-container">
						<Query query={getAffinityData} variables={{ email: this.state.crmid }}>
							{({ data, loading, error }) => {
								if (loading) return <p />;
								if (error) {
									console.log(`error in getPageScroll : ${error.messgae}`);
								}
								if (error) return <p>{console.log(error.message)}</p>;
								console.log(data);
								if (data.getAffinity !== null) {
									let template = data.getAffinity.map((section, i) => {
										if (section.results && section.results.length > 0) {
											let heading = 'Based on';
											if (section.parameter_type === 'IS_OF_GENRES_COMBO') {
												heading = 'Recommended Movies in ';
											} else if (section.parameter_type === 'ACTOR') {
												heading = 'Recommended Movies Acted by ';
											} else if (section.parameter_type === 'CREW_MEMBER') {
												if (section.crew_job === 'Director') {
													heading = 'Recommended Movies Directed by ';
												} else if (section.crew_job === 'Writer') {
													heading = 'Recommended Movies Written by ';
												}
											}

											return (
												<CategoryComponent
													count={5}
													title={`${heading} ${section.parameter}`}
													movies={section.results}
												/>
											);
										} else {
											return <p />;
										}
									});
									return template;
								} else {
									return <p />;
								}
							}}
						</Query>
					</div>

					<div className="container">
						<div className="row">
							<div className="col-sm-12">
								<Query
									query={getPageScroll}
									variables={{ first: 0, email: this.state.crmid, limit: this.limitcount }}
								>
									{({ data, loading, error, fetchMore }) => {
										if (loading) return <p />;
										if (error) {
											console.log(`error in getPageScroll : ${error.messgae}`);
										}
										if (error) return <p>{console.log(error.message)}</p>;
										let current = this.pagecount;
										return (
											<InfiniteScroll
												pageStart={0}
												loadMore={() => {
													this.handleMore(data, fetchMore, current);
												}}
												hasMore={true}
												loader={
													<div className="load-bar" style={{ marginBottom: '10px' }}>
														<div className="bar" />
														<div className="bar" />
														<div className="bar" />
														<div className="bar" />
													</div>
												}
												useWindow={true}
											>
												{(() => {
													if (data.onPageScroll !== null) {
														let template = data.onPageScroll.map((section, i) => {
															if (section.results && section.results.length > 0) {
																let heading = 'Based on';
																if (section.parameter_type === 'IS_OF_GENRES_COMBO') {
																	heading = 'Movies in ';
																} else if (section.parameter_type === 'ACTOR') {
																	heading = 'Movies Acted by ';
																} else if (section.parameter_type === 'CREW_MEMBER') {
																	if (section.crew_job === 'Director') {
																		heading = 'Movies Directed by ';
																	} else if (section.crew_job === 'Writer') {
																		heading = 'Movies Written by ';
																	}
																}

																return (
																	<CategoryComponent
																		count={5}
																		title={`${heading} ${section.parameter}`}
																		movies={section.results}
																	/>
																);
															} else {
																return <p />;
															}
														});
														return template;
													} else {
														return <p />;
													}
												})()}
											</InfiniteScroll>
										);
									}}
								</Query>
							</div>
						</div>
					</div>
				</div>
			</section>
		);
	}

	handleMore(data, fetchMore, current) {
		this.pagecount++;
		fetchMore({
			variables: { first: this.pagecount, email: this.state.crmid, limit: 1 },
			updateQuery: (prev, { fetchMoreResult }) => {
				const newSection = fetchMoreResult.onPageScroll;
				return newSection && newSection.length
					? { onPageScroll: [ ...prev.onPageScroll, ...newSection ] }
					: prev;
			}
		});
	}
}
export default withRouter(ContextPage);
