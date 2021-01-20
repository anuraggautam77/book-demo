import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import '../style/css/register.scss';
import ResetPassowrdComponent from '../components/account/resetPassword';

export default class ResetPasswordContainer extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="registerpage">
				<section className="login-block">
					<div className="col-md-12 container">
						<div className="row">
							<div className="col-md-12 container">
								<div className="form">
									<ResetPassowrdComponent />
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
		);
	}
}
