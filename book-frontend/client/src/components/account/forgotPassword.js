import React, { Component, Fragment } from 'react';
import Cookie from '../../common/cookie';
import { withRouter } from 'react-router-dom';
import { forgotpassword } from '../../common/services';

const initialState = {
	email: '',
	password: '',
	errormsg: '',
	errortype: ''
};
class ForgotPasswordComponent extends Component {
	constructor(props) {
		super(props);
		this.cookieInstance = new Cookie();
		this.state = {
			...initialState
		};
	}

	validateForm() {
		const { email } = this.state;
		this.state;
		const isInvalid = !email;
		return isInvalid;
	}

	handleSubmit(event) {
		event.preventDefault();
		PubSub.publish('LOADER_HIDE_SHOW', true);
		forgotpassword(this.state.email)
			.then((resposne) => {
				PubSub.publish('LOADER_HIDE_SHOW', false);
				if (resposne.data.status == 'success') {
					this.setState({
						errormsg:
							'A message will be sent to your register email address containing a link to reset your password !',
						errortype: 'success'
					});
					//	this.clearState();
				} else {
					this.setState({ errormsg: response.data.message, errortype: 'error' });
				}
			})
			.catch((error) => {
				this.setState({
					errormsg: 'ERROR',
					errortype: 'error'
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
		const { email } = this.state;
		return (
			<Fragment>
				<form onSubmit={(event) => this.handleSubmit(event)}>
					<div className="tab-content">
						<div id="login">
							<h1> Forgot Password ?</h1>

							<div className={this.state.errortype}>{this.state.errormsg}</div>
							<div className="field-wrap">
								<input
									type="email"
									placeholder="Email Address"
									required
									name="email"
									value={email}
									onChange={this.handleChange.bind(this)}
								/>
							</div>
							<button type="submit" className="button button-block">
								Reset Password
							</button>
						</div>
					</div>
				</form>
			</Fragment>
		);
	}
}

export default withRouter(ForgotPasswordComponent);
