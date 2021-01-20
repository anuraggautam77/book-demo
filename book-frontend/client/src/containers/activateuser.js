import React, { Component, Fragment } from 'react';
import '../style/css/register.scss';
import { Link } from 'react-router-dom';
import { activateUser } from '../common/services';

export default class ActivateUserContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			message: 'Please wait while we are verifying your account !!!',
			linkshow: 'dn'
		};
	}

	componentDidMount() {
		const jwt = this.props.match.params;
		activateUser(jwt)
			.then((response) => {
				if (response.data && response.data.status == 'success') {
					this.setState({
						message: 'Your account has been activated successfully',
						linkshow: ''
					});
				} else {
					this.setState({
						message: 'Your e-mail activation link is invalid.',
						linkshow: ''
					});
				}
			})
			.catch((error) => {
				this.setState({
					message: 'Something goes wrong !!!!'
				});
			});
	}

	render() {
		return (
			<div className="registerpage">
				<section className="login-block">
					<div className="col-md-12 container">
						<div className="row">
							<div className="col-md-12 container text-center">
								<div className="form">
									{this.state.message}
									<br />
									{(() => {
										if (this.state.linkshow !== 'dn') {
											return (
												<Link className="activiationbutton" to="/signin">
													Login
												</Link>
											);
										}
									})()}
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
		);
	}
}
