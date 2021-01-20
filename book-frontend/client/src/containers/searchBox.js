import React, { Component, Fragment } from 'react';
import '../style/css/searchbox.scss';
//import spoken from '../../../node_modules/spoken/build/spoken.js';
import { searchtext } from '../common/services';
import { NavLink, Link, withRouter } from 'react-router-dom';
import _ from 'lodash';
import Masonry from 'react-masonry-component';

const masonryOptions = {
	transitionDuration: 6
};
const imagesLoadedOptions = { background: '.my-bg-image-el' };

export default class SearchContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			openSearch: false,
			searchText: '',
			movieData: {},
			showError: false,
			message: ''
		};
		this.onFocusTrigger = this.onFocusTrigger.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.micHandler = this.micHandler.bind(this);
	}

	micHandler() {
		console.log(spoken.say('Search any Movie'));
		spoken.say('Search any Movie').then((speech) => {
			spoken.listen.on.partial((ts) => console.log(ts));
			spoken
				.listen()
				.then((transcript) => {
					spoken.say(`keyword is ${transcript}`);
					this.setState({ searchText: transcript }, () => {
						this.serviceCall();
					});
				})
				.catch((error) => console.warn(error.message));
		});
	}
	onFocusTrigger(flag) {
		if (!flag) {
			this.props.onHideShowSearch(true);
			this.setState({ openSearch: flag, movieData: {}, searchText: '', showError: false });
		} else {
			this.props.onHideShowSearch(false);
			this.setState({ openSearch: flag, searchText: '', showError: false });
		}
	}

	serviceCall() {
		searchtext(this.state.searchText).then((response) => {
			if (response.data.status == 'success') {
				if (
					response.data.data &&
					response.data.data.title.length == 0 &&
					response.data.data.overview.length == 0 &&
					response.data.data.keyword.length == 0
				) {
					this.setState({ message: 'No Record Found !', showError: true, movieData: {} });
				} else {
					this.setState({ movieData: response.data.data, showError: false });
				}
			} else {
				this.setState({ message: 'No Record Found !', showError: true, movieData: {} });
			}
		});
	}

	submitHandler(event) {
		event.preventDefault();
		this.serviceCall();
	}

	handleChange(event) {
		const name = event.target.name;
		const value = event.target.value;
		this.setState({
			[name]: value
		});
	}

	renderTemplate(movieList) {
		const keywordTemp = movieList.map((movie, i) => {
			const imgUrl = `https://image.tmdb.org/t/p/w300${movie.poster_path}`;
			const linkurl = _.kebabCase(movie.title);
			return (
				<div className="image-element-class col-md-3" key={i}>
					<div className="card">
						<img className="img-fluid" src={imgUrl} alt="Card image" />
						<div className="card-img-overlay">
							<span className="badge badge-pill badge-danger">{movie.glob_vote_count}</span>
						</div>
						<div className="card-body">
							<div className="news-title">
								<h2 className=" title-small">
									<Link to={`/detail/${movie.media_id}/${linkurl}`}>{movie.title}</Link>
								</h2>
							</div>
							<p className="card-text">
								<small className="text-time">
									<Link to={`/detail/${movie.media_id}/${linkurl}`}>
										<em>{movie.tagline}</em>
									</Link>
								</small>
							</p>
						</div>
					</div>
				</div>
			);
		});
		return keywordTemp;
	}

	render() {
		return (
			<Fragment>
				<div />
				<div id="morphsearch" className={`morphsearch  ${this.state.openSearch ? 'open' : ''}  `}>
					<form className="morphsearch-form" onSubmit={(e) => this.submitHandler(e)}>
						<div className="input-group admin-bar">
							<input
								className="morphsearch-input"
								onFocus={() => this.onFocusTrigger(true)}
								type="search"
								name="searchText"
								value={this.state.searchText}
								onChange={this.handleChange}
								autoComplete="off"
								placeholder="Search..."
							/>
							<button className="morphsearch-submit" type="submit">
								<i className="fa fa-search" aria-hidden="true" />
							</button>
						</div>
					</form>
					<div className="morphsearch-content">
						{(() => {
							if (this.state.showError) {
								return <h5>{this.state.message}</h5>;
							}
						})()}

						<div className="container">
							<div className="row">
								<div className="col-sm-12">
									{(() => {
										if (this.state.movieData.title && this.state.movieData.title.length > 0) {
											return (
												<Fragment>
													<h2 className="section-title">Based on Movie Title</h2>
													<div className="row">
														<div className="col-sm-12">
															<Masonry
																options={masonryOptions}
																updateOnEachImageLoad={false}
																imagesLoadedOptions={imagesLoadedOptions}
															>
																{this.renderTemplate(this.state.movieData.title)}
															</Masonry>
														</div>
													</div>
												</Fragment>
											);
										}
									})()}
								</div>
								{/*}	<div className="mic_on" onClick={this.micHandler}>
									<span className="mic_on_icon">
										<i className="fa fa-microphone" aria-hidden="true" />
									</span>
								</div>
								{*/}
							</div>
							<div className="row">
								<div className="col-sm-12">
									{(() => {
										if (this.state.movieData.keyword && this.state.movieData.keyword.length > 0) {
											return (
												<Fragment>
													<h2 className="section-title">Based on Keywords</h2>
													<div className="row">
														<div className="col-sm-12">
															<Masonry
																options={masonryOptions}
																updateOnEachImageLoad={false}
																imagesLoadedOptions={imagesLoadedOptions}
															>
																{this.renderTemplate(this.state.movieData.keyword)}
															</Masonry>
														</div>
													</div>
												</Fragment>
											);
										}
									})()}
								</div>
							</div>
							<div className="row">
								<div className="col-sm-12">
									{(() => {
										if (this.state.movieData.overview && this.state.movieData.overview.length > 0) {
											return (
												<Fragment>
													<h2 className="section-title">Overview</h2>
													<div className="row">
														<div className="col-sm-12">
															<Masonry
																options={masonryOptions}
																updateOnEachImageLoad={false}
																imagesLoadedOptions={imagesLoadedOptions}
															>
																{this.renderTemplate(this.state.movieData.overview)}
															</Masonry>
														</div>
													</div>
												</Fragment>
											);
										}
									})()}
								</div>
							</div>
						</div>
					</div>
					<span className="morphsearch-close" onClick={() => this.onFocusTrigger(false)} />
				</div>
			</Fragment>
		);
	}
}
