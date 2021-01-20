import React, { Fragment, Component } from 'react';
import StarRatingComponent from 'react-star-rating-component';
import ISO6391 from 'iso-639-1';
import { NavLink, Link, withRouter } from 'react-router-dom';
import ImageGridComponent from './imagegrid';

class DetailComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			rating: 0,
			detail: props.movieData
		};
	}

	onStarClick(nextValue, prevValue, name) {
		this.setState({ rating: nextValue });
	}

	movieDetailRender() {
		const { rating } = this.state;
		if (this.state.detail.moviedetail.length > 0) {
			const {
				voteavg,
				backdrop,
				path,
				title,
				genre,
				language,
				company,
				votecount,
				country,
				overview,
				actors,
				crew,
				date,
				movieid
			} = this.state.detail.moviedetail[0];
			let backdropimg;

			if (backdrop !== 'None' && backdrop !== undefined) {
				backdropimg = `https://image.tmdb.org/t/p/w1400_and_h450_face/${backdrop}`;
			} else {
				backdropimg = `${window.location.origin}/img/back.png`;
			}

			return (
				<div className="movie-title-detail">
					<div className="row">
						<div className="col-12 col-md-12 col-lg-12 text-lg-left well1">
							<div
								className="col-12 col-md-12"
								style={{
									marginTop: '10px'
								}}
							>
								<Link
									to="/"
									style={{
										color: '#fff',
										textDecoration: 'none'
									}}
								>
									<strong>
										<i className="fas fa-long-arrow-alt-left" /> &nbsp; Back to Home
									</strong>
								</Link>
								<section className="section-inset-2 text-center bg-gray-900">
									<h2>{title}</h2>
									<hr className="hr-primary" />
								</section>
							</div>
						</div>
					</div>

					<section className="section section-inset-1 bg-gray-900">
						<div
							className="col-sm-12 c-container-gardient"
							style={{ backgroundImage: `url(${backdropimg})` }}
						>
							<div className="row">
								<div className="col-12 col-md-12 col-lg-3">
									<div className="c-container-frame col-md-12">
										<img
											style={{ width: '100%', boxShadow: '0 0 8px 8px #bdcfd0' }}
											src={`https://image.tmdb.org/t/p/w300${path}`}
											alt=""
										/>
									</div>
								</div>
								<div className="col-12 col-md-12 col-lg-5" />
								<div className="col-12 col-md-12 col-lg-4">
									<div
										className="box-part text-center"
										style={{
											background: 'rgba(126, 122, 119, 0.6)'
										}}
									>
										<div
											className="font-weight-bold"
											style={{ margin: 'auto', display: 'inline-block' }}
										>
											<div className="numberCircle">{voteavg}</div>
											<small>Count:{votecount}</small>
										</div>
										<ul className="movie-meta text-left">
											{(() => {
												if (date !== null) {
													return (
														<li>
															<strong>Release year:</strong> {date}
														</li>
													);
												}
											})()}

											{(() => {
												if (genre.length > 0) {
													return (
														<li>
															<strong>Genre:&nbsp;:</strong> {genre.join(', ')}
														</li>
													);
												}
											})()}

											{(() => {
												if (country.length > 0) {
													return (
														<li>
															<strong>Country:&nbsp;:</strong> {country.join(', ')}
														</li>
													);
												}
											})()}

											{(() => {
												if (language !== null) {
													return (
														<li>
															<strong>Language:&nbsp;:</strong>{' '}
															{ISO6391.getName(language)}
														</li>
													);
												}
											})()}
										</ul>
										<div
											className=" rating-container col-12 col-md-12 col-lg-12"
											style={{ background: ' rgba(216, 130, 130, 0.46)' }}
										>
											<StarRatingComponent
												name="rate1"
												starCount={5}
												value={rating}
												onStarClick={this.onStarClick.bind(this)}
											/>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className="row">
							<div className="col-12 col-md-12 col-lg-12 text-lg-left well1">
								<div className="col-12 col-md-12">
									<section className="section-inset-2 text-center bg-gray-900">
										<h3>Storyline</h3>
										<hr className="hr-primary" />
									</section>
								</div>
							</div>
							<div className="text-center col-12 col-md-12 col-lg-12">
								<p>{overview}</p>
							</div>
						</div>

						<div className="row">
							<div className="col-12 col-md-12 col-lg-12 text-lg-left well1">
								<div className="col-12 col-md-12" />
							</div>
						</div>

						

						{(() => {
							if (actors.length > 0 && actors[0].name !== null) {
								return (
									<div className="row" style={{ marginTop: '20px' }}>
										<div className="col-12 col-md-12 ">
											{(() => {
												return (
													<ImageGridComponent title="Actors" count={1} collection={actors} />
												);
											})()}
										</div>
									</div>
								);
							}
						})()}

						{(() => {
							if (crew.length > 0 && crew[0].name !== null) {
								return (
									<div className="row" style={{ marginTop: '20px' }}>
										<div className="col-12 col-md-12 ">
											{(() => {
												return <ImageGridComponent title="Crew" collection={crew} />;
											})()}
										</div>
									</div>
								);
							}
						})()}
					</section>
				</div>
			);
		}
	}

	render() {
		return <Fragment>{this.movieDetailRender()}</Fragment>;
	}
}

export default DetailComponent;
