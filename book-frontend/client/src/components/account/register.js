import React, { Component, Fragment } from 'react';

import { registerUser } from '../../common/services';

const initialState = {
	firstName: '',
	lastName: '',
	email: '',
	password: '',
	error: ''
};

class SignUpComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			...initialState
		};
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

	handleSubmit(event) {
		event.preventDefault();
		PubSub.publish('LOADER_HIDE_SHOW', true);
		registerUser({
			firstName: this.state.firstName,
			lastName: this.state.lastName,
			password: this.state.password,
			userId: this.state.email
		})
			.then((response) => {
				PubSub.publish('LOADER_HIDE_SHOW', false);
				if (response.data && response.data.status == 'success') {
					this.setState({
						errormsg:
							'Your information has been sent successfully. In order to complete your registration, please click the confirmation link in the email that we have sent to you.',
						errortype: 'success',
						firstName: '',
						lastName: '',
						email: '',
						password: ''
					});
				} else {
					this.setState({ errormsg: response.data.message, errortype: 'error' });
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}

	validateForm() {
		const { firstName, lastName, email, password } = this.state;
		this.state;
		const isInvalid = !firstName || !lastName || !email || !password || password.length <= 7;
		return isInvalid;
	}

	render() {
		const { firstName, lastName, email, password } = this.state;

		return (
			<Fragment>
				<div className="tab-content">
					<form onSubmit={(event) => this.handleSubmit(event)}>
						<div id="signup">
							<h1>Sign up now</h1>

							<div className={this.state.errortype}>{this.state.errormsg}</div>

							<div className="row">
								<div className="field-wrap col-md-6">
									<input
										placeholder="First Name"
										type="text"
										name="firstName"
										required
										value={firstName}
										onChange={this.handleChange.bind(this)}
										autoComplete="off"
									/>
								</div>

								<div className="field-wrap col-md-6">
									<input
										type="text"
										placeholder="Last Name"
										required
										name="lastName"
										value={lastName}
										onChange={this.handleChange.bind(this)}
										autoComplete="off"
									/>
								</div>
							</div>

							<div className="field-wrap">
								<input
									type="email"
									placeholder="Email Address"
									required
									name="email"
									value={email}
									onChange={this.handleChange.bind(this)}
									autoComplete="off"
								/>
							</div>

							<div className="field-wrap">
								<input
									type="password"
									placeholder="Set A Password"
									required
									name="password"
									value={password}
									onChange={this.handleChange.bind(this)}
									autoComplete="off"
								/>
								<p className="pass-message">Password must be at least 8 Characters</p>
							</div>

							<button type="submit" className="button button-block" disabled={this.validateForm()}>
								Create Account
							</button>
						</div>
					</form>
				</div>
			</Fragment>
		);
	}
}

export default SignUpComponent;
