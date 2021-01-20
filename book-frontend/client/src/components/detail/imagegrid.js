import React, { Component, Fragment } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import '../../style/css/carousellisting.scss';
import _ from 'lodash';

export default class ImageGridComponent extends Component {
	constructor(props) {
		super(props);
	}

	articleTemplate() {
		if (this.props.collection) {
			const template = this.props.collection.map((title, i) => {
				if (title.image !== null) {
					const imgUrl = `https://image.tmdb.org/t/p/w300${title.image}`;
					return (
						<div className="col-md-2" key={i}>
							<div
								className="category"
								style={{
									marginBottom: '20px'
								}}
							>
								<img className="card-img-top" src={imgUrl} alt="Card image" />
								<p className="titledes">{title.name}</p>
							</div>
						</div>
					);
				}
			});
			return template;
		}
	}

	render() {
		const items = this.articleTemplate();
		return (
			<Fragment>
				<div className="row">
					<section className="section-inset-2 text-center bg-gray-900">
						<h3>{this.props.title}</h3>
						<hr className="hr-primary" />
					</section>
				</div>
				<div className="row justify-content-center">{items}</div>
			</Fragment>
		);
	}
}
