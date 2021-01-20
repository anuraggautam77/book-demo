import React, { Component, Fragment } from 'react';
import { NavLink, Link, withRouter } from 'react-router-dom';

import '../../style/css/pageslider.scss';

class PageSlider extends Component {
	constructor(props) {
		super(props);
		this.state = {
			movies: this.props.movies
		};
	}

	articleTemplate() {
		if (this.props.movies) {
			const template = this.props.movies.map((movie, i) => {
				const imgUrl = `https://image.tmdb.org/t/p/w780/${movie.backdrop}`;
				let linkurl = _.kebabCase(movie.title);
				return (
					<li key={i}>
						<div className="image_title">
							<Link to={`/detail/${movie.movieid}/${linkurl}`}>{movie.title}</Link>
						</div>
						<a href="#">
							<img src={`${imgUrl}`} />
						</a>
					</li>
				);
			});
			return template;
		}
	}

	render() {
		return (
			<div className="page-slider">
				<div className="accordian">
					<ul>{this.articleTemplate()}</ul>
				</div>
			</div>
		);
	}
}

export default PageSlider;
