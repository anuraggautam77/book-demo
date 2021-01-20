import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import '../style/css/register.scss';
import SignUpComponent from '../components/account/register';

export default class RegisterContainer extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="registerpage">
				<section className="login-block">
					<div className="col-md-7 container">
						<div className="row">
							<div className="col-md-12">
								<div className="form">
									<ul className="tab-group">
										<li className="tab active">
											<Link to="/signup">Sign Up</Link>
										</li>
										<li className="tab ">
											<Link to="/signin">Log In</Link>
										</li>
									</ul>

									<SignUpComponent />
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
		);
	}
}
