import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import '../style/css/register.scss';
import SignInComponent from '../components/account/login';

export default class SigninContainer extends Component {
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
										<li className="tab ">
											<Link to="/signup">Sign Up</Link>
										</li>
										<li className="tab active">
											<Link to="/signin">Log In</Link>
										</li>
									</ul>
									<SignInComponent />
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
		);
	}
}
