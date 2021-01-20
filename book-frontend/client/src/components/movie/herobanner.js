import React, { Component, Fragment } from 'react';
var Coverflow = require('react-coverflow');
import Radium, { StyleRoot } from 'radium';
import _ from 'lodash';

class HeroBanner extends Component {
	constructor(props) {
		super(props);
		this.state = {
			movies: [1,2,3,4,5,6,7,8,9,10],
			navigation:  true,
			height:  650
		};
	}
	getAllImages() {

		const template = this.state.movies.map((movie, i) => {
			const imagurl = `https://image.tmdb.org/t/p/w300_and_h450_bestv2/xBHvZcjRiWyobQ9kxBhO6B2dtRI.jpg`;
			let linkurl = _.kebabCase('ad-astra');
			return (
				<img
					src={imagurl}
					data-action={`${window.location.origin}/detail/${movie.movieid}/${linkurl}`}
					alt={"Ad astra"}
					key={i}
				/>
			);
		});

		return template;
	}

	render() {
		return (
			<Fragment>
				<div className="hero-banner-slider">
					<Coverflow
						displayQuantityOfSide={2}
						navigation={this.state.navigation}
						enableScroll={false}
						clickable={true}
						height={this.state.height}
						active={0}
					>
						{this.getAllImages()}
					</Coverflow>
				</div>
			</Fragment>
		);
	}
}

export default HeroBanner;
