import React, { Component } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import '../../style/css/carousellisting.scss';
import _ from 'lodash';
import Placeholder from '../../containers/placeholder';
import { NavLink, Link, withRouter } from 'react-router-dom';

class CategoryComponent extends Component {
	constructor(props) {
		super(props);

		this.state = {
			currentIndex: 0,
			to: 100,
			responsive: {
				0: { items: 2 },
				600: { items: 2 },
				1024: { items: this.props.count || 4 }
			}
		};

		this.ENTITY_CLICK = 'entity-click';
		this.NAV_NEXT = 'carousel-click-next';
		this.PREV_NEXT = 'carousel-click-previous';

		this.clickHandler = this.clickHandler.bind(this);
		this.nextClick = this.nextClick.bind(this);
	}

	clickHandler(movie, section, e) {
		const entityLoad = {
			entity: {
				id: movie.movieid,
				name: movie.title,
				genre: ''
			},
			sectionname: section
		};

		_recommendations.trackEvent(this.ENTITY_CLICK, entityLoad);
		//_recommendations.trackPageLoad(entityLoad);
	}

	articleTemplate() {
		let strClassName = '';
		let styleValue = { padding: '2px' };
		if (this.props.count == 5 && this.props.movies.length <= 4) {
			strClassName = 'col-md-3';
			styleValue = { padding: '10px' };
		}

		if (this.props.movies) {
			const template = this.props.movies.map((movie, i) => {
				const imgUrl = `https://image.tmdb.org/t/p/w300${movie.path}`;
				let linkurl = _.kebabCase(movie.title);
				return (
					<div key={i} style={styleValue} className={strClassName}>
						<Link to={`/detail/${movie.movieid}/${linkurl}`}>
							<div
								className="category"
								onClick={(e) => {
									this.clickHandler(movie, this.props.title, e);
								}}
							>
								<img className="card-img-top" src={imgUrl} alt="Card image" />
								<div className="card-img-overlay">
									<span className="badge badge-pill badge-danger">{movie.voteavg}</span>
								</div>
							</div>
						</Link>
					</div>
				);
			});
			return template;
		}
	}

	prevClick(section) {
		this.navigationTrack(section, this.PREV_NEXT, this.Carousel);
		this.Carousel._slidePrev();
	}

	nextClick(section) {
		this.navigationTrack(section, this.NAV_NEXT, this.Carousel);
		this.Carousel._slideNext();
	}

	navigationTrack(section, event, obj) {
		obj.state.slides.map((items, i) => {});

		//	_recommendations.trackEvent(this.ENTITY_CLICK, entityLoad);
	}

	render() {
		const items = this.articleTemplate();
		if (this.props.count == 5 && items.length <= 4) {
			return (
				<div className="carousel-listing">
					<div className="main_title_1 md-top">
						<h2>{this.props.title}</h2>
					</div>
					<div
						className="c-container col-md-12"
						style={{
							background: 'linear-gradient(to right, rgb(65, 111, 111), rgb(10, 49, 39))'
						}}
					>
						<div className="row justify-content-center">{items}</div>
					</div>
				</div>
			);
		} else {
			return (
				<div className="carousel-listing">
					<div className="main_title_1 md-top">
						<h2>{this.props.title}</h2>
					</div>
					{items.length > 0 ? (
						<div className="c-container col-md-12">
							<div className="prevbtn bttn" onClick={() => this.prevClick(this.props.title)}>
								<img src={`${location.origin}/img/prev.png`} />
							</div>
							<AliceCarousel
								fadeOutAnimation={true}
								autoPlayDirection="ltr"
								autoPlay={false}
								duration={900}
								startIndex={this.state.currentIndex}
								items={items}
								mouseDragEnabled={false}
								responsive={this.state.responsive}
								dotsDisabled={true}
								buttonsDisabled={true}
								ref={(el) => (this.Carousel = el)}
							/>
							<div className="nxtbtn bttn" onClick={() => this.nextClick(this.props.title)}>
								<img src={`${location.origin}/img/next.png`} />
							</div>
						</div>
					) : (
						<div>
							<Placeholder />
						</div>
					)}
				</div>
			);
		}
	}
}
export default withRouter(CategoryComponent);
