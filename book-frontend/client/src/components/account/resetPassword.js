import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { resetpassword } from '../../common/services';
const initialState = {
	password: '',
	errormsg: '',
	confirmpassword: '',
	errortype: ''
};
class ResetPassowrdComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			...initialState,
			key: this.props.match.params.token
		};
	}

	componentDidMount() {
		this.setState({ ...this.state, key: this.props.match.params.token });
	}
	validateForm() {
		let invalid = !false;
		const { password, confirmpassword } = this.state;
		if (password == confirmpassword && password.length > 7) {
			invalid = !true;
		}
		return invalid;
	}

	handleSubmit(event) {
		event.preventDefault();
		console.log(this.state);

		resetpassword({ password: this.state.password, jwt: this.state.key })
			.then(({ data }) => {
				if (data) {
					if (data.status !== 'success') {
						this.setState({ errormsg: data.message, errortype: 'error' });
					} else {
						this.setState({ errormsg: 'Password Reset Successfully !', errortype: 'success' });
					}
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
		const { confirmpassword, password } = this.state;
		return (
			<Fragment>
				<form onSubmit={(event) => this.handleSubmit(event)}>
					<div className="tab-content">
						<div id="login">
							<h1> Reset Your Password!</h1>
							<div className={this.state.errortype}>{this.state.errormsg}</div>
							<div className="field-wrap">
								<input
									type="password"
									placeholder="Enter new Password"
									required
									name="password"
									value={password}
									onChange={this.handleChange.bind(this)}
								/>
							</div>
							<div className="field-wrap">
								<input
									type="password"
									placeholder="Confirm password"
									required
									name="confirmpassword"
									value={confirmpassword}
									onChange={this.handleChange.bind(this)}
								/>
							</div>
							<button type="submit" disabled={this.validateForm()} className="button button-block">
								Reset Password
							</button>
						</div>
					</div>
				</form>
			</Fragment>
		);
	}
}

export default withRouter(ResetPassowrdComponent);
