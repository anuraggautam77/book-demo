import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import '../style/css/notfound.scss';

export default class NoMatch extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		if (this.props.showpopup) {
			return (
				<Fragment>
					<section className="banner-sec detail-page">
						<div className="container  text-center wrapper-container">
							<div className="col-md-12">
								<div className="error-content section-title text-center">
									<h3 >Add Preferences !</h3>
									<hr className="hr-primary" />
									<p>
										To get your personalized recommendations,<br /> please provide your genres and
										languages preferences.<br />
									</p>

									<Link to="/profile" className="back-home">
										Add Now
									</Link>
								</div>
							</div>
						</div>
					</section>
				</Fragment>
			);
		} else {
			return (
				<Fragment>
					<section className="banner-sec detail-page">
						<div className="container  text-center wrapper-container">
							<div className="col-md-12">
								<div className="error-content section-title text-center">
									<h1>
										<span className="four">4</span>
										<span className="zero">0</span>
										<span className="four">4</span>
									</h1>
									<hr className="hr-primary" />
									<h2>
										<span> oops !</span> page not found
									</h2>
									<p>
										We are sorry the page your are requested could not found ,<br />
										Please Go back to Home Page!
									</p>
									<Link to="/" className="back-home">
										Visit Homepage
									</Link>
								</div>
							</div>
						</div>
					</section>
				</Fragment>
			);
		}
	}
}
