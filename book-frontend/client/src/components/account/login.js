import React, { Component, Fragment } from 'react';

import Cookie from '../../common/cookie';
import { withRouter } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { loginUser } from '../../common/services';

const initialState = {
	email: '',
	password: '',
	errormsg: '',
	errortype: ''
};
class SignInComponent extends Component {
	constructor(props) {
		super(props);
		this.cookieInstance = new Cookie();
		this.state = {
			...initialState
		};
	}

	validateForm() {
		const { email, password } = this.state;
		this.state;
		const isInvalid = !email || !password || password.length <= 7;
		return isInvalid;
	}

	handleSubmit(event) {
		event.preventDefault();
		PubSub.publish('LOADER_HIDE_SHOW', true);
		loginUser({ userId: this.state.email, password: this.state.password })
			.then((response) => {
				PubSub.publish('LOADER_HIDE_SHOW', false);

				if (response.data && response.data.status !== 'success') {
					this.setState({ errormsg: response.data.message, errortype: 'error' });
				} else {
					let noticeFlag = false;
					if (response.data.userDetail && response.data.userDetail.preference == false) {
						noticeFlag = true;
					}

					this.cookieInstance.setCookie('context', { value: response.data.userDetail.userId });
					this.cookieInstance.setCookie('name', { value: response.data.userDetail.firstName });
					this.cookieInstance.setCookie('lname', { value: response.data.userDetail.lastName });
					this.cookieInstance.setCookie('notice', { value: noticeFlag });

					this.clearState();
					PubSub.publish('LOGIN_CHANGE');
					_recommendations.trackPageLoad();
					this.props.history.push('/');
				}
			})
			.catch((error) => {
				console.log(error);
				this.setState({
					error: 'Your email is already taken. Please try again.'
				});
			});
	}

	handleChange(event) {
		const name = event.target.name;
		const value = event.target.value;
		this.setState({
			[name]: value
		});
	}

	clearState() {
		this.setState({ ...initialState });
	}

	render() {
		const { email, password } = this.state;
		return (
			<Fragment>
				<ToastContainer autoClose={8000} />
				<form onSubmit={(event) => this.handleSubmit(event)}>
					<div className="tab-content">
						<div id="login">
							<h1>Login to your account!</h1>
							<div className={this.state.errortype}>{this.state.errormsg}</div>
							<div className="row">
								<div className="field-wrap col-md-6">
									<input
										type="email"
										placeholder="Email Address"
										required
										name="email"
										value={email}
										onChange={this.handleChange.bind(this)}
									/>
								</div>

								<div className="field-wrap col-md-6">
									<input
										type="password"
										placeholder="Password"
										name="password"
										value={password}
										onChange={this.handleChange.bind(this)}
										required
										autoComplete="off"
									/>
								</div>
							</div>

							<p className="forgot">
								<Link to="/forgotpassword">Forgot Password?</Link>
							</p>

							<button type="submit" className="button button-block">
								Log In
							</button>
						</div>
					</div>
				</form>
			</Fragment>
		);
	}
}

export default withRouter(SignInComponent);
