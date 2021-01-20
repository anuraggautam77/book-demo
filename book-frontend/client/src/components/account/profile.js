import React, { Component, Fragment } from 'react';
import Cookie from '../../common/cookie';
import { withRouter } from 'react-router-dom';
import Select from 'react-select';
import { NavLink, Link } from 'react-router-dom';

import { getUserInfo, postUserDetail, getGenres, getLanguages } from '../../common/services';

class ProfileComponent extends Component {
	constructor(props) {
		super(props);
		this.cookieInstance = new Cookie();
		this.state = {
			errormsg: '',
			errortype: '',
			firstname: '',
			genres: [],
			languages: [],
			lastname: '',
			email: this.cookieInstance.getCookie('context'),
			defaultgenres: [],
			defaultlang: [],
			genresOption: [],
			languagesOption: []
		};
		this.onSelectChange = this.onSelectChange.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.onLanguageSelectionChange = this.onLanguageSelectionChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentWillMount() {
		getUserInfo(this.state.email).then((response) => {
			if (response.data.status == 'success') {
				const { data } = response.data;
				this.setState({
					firstname: data.firstName,
					lastname: data.lastName,
					genres: data.genres.length > 0 ? [ ...data.genres ] : [],
					languages: data.languages.length > 0 ? [ ...data.languages ] : []
				});

				getGenres().then((genresData) => {
					let tempdefault = [];

					genresData.data.data.map((genre) => {
						if (response.data.data.genres.indexOf(genre.value) != -1) {
							tempdefault.push(genre);
						}
					});

					this.setState({
						...this.state,
						genresOption: [ ...genresData.data.data ],
						defaultgenres: tempdefault
					});
				});
				getLanguages().then((languageData) => {
					let defaultValue = [];

					languageData.data.data.map((lan) => {
						if (response.data.data.languages.indexOf(lan.value) != -1) {
							defaultValue.push(lan);
						}
					});

					this.setState({
						...this.state,
						languagesOption: [ ...languageData.data.data ],
						defaultlang: defaultValue
					});
				});
			}
		});
	}

	onSelectChange(selectedOption) {
		let options = [];
		selectedOption.map((items) => {
			options.push(items.value);
		});
		this.setState({
			genres: [ ...options ],
			defaultgenres: [ ...selectedOption ]
		});
	}

	onLanguageSelectionChange(selectedLanguages) {
		let langOption = [];
		selectedLanguages.map((items) => {
			langOption.push(items.value);
		});
		this.setState({ languages: [ ...langOption ], defaultlang: [ ...selectedLanguages ] });
	}

	validateForm() {
		const { email } = this.state;
		this.state;
		const isInvalid = !email;
		return isInvalid;
	}

	handleSubmit(event, clickhandler) {
		event.preventDefault();
		PubSub.publish('LOADER_HIDE_SHOW', true);
		postUserDetail({
			firstName: this.state.firstname,
			lastName: this.state.lastname,
			genres: this.state.genres,
			languages: this.state.languages,
			userId: this.state.email
		}).then((response) => {
			PubSub.publish('LOADER_HIDE_SHOW', false);

			if (response.data.status == 'success') {
				this.setState({
					errormsg: 'Profile Updated Successfully !!!',
					errortype: 'success'
				});
				if (this.state.genres.length > 0 && this.state.languages.length > 0) {
					this.cookieInstance.setCookie('notice', { value: false });
				} else {
					this.cookieInstance.setCookie('notice', { value: true });
				}
			}
		});
	}

	handleChange(event) {
		const name = event.target.name;
		const value = event.target.value;
		this.setState({
			[name]: value
		});
	}

	render() {
		const { firstname, lastname, defaultlang, defaultgenres, genresOption, languagesOption } = this.state;
		return (
			<Fragment>
				<div
					style={{
						marginTop: '10px'
					}}
				>
					<Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>
						<strong>
							<i className="fas fa-long-arrow-alt-left" /> &nbsp; Back to Home
						</strong>
					</Link>
				</div>
				<div className="form">
					<div className={`${this.state.errortype} text-center`}>{this.state.errormsg}</div>
					<div className="main_title_1">
						<h2>User Profile</h2>
					</div>
					<hr />
					<div className="row">
						<div className="col-sm-4">
							<div className="card card-profile text-center">
								<img
									alt=""
									className="card-img-top"
									src="https://unsplash.it/340/160?image=354"
									style={{ minHeight: '150px' }}
								/>
								<div className="card-block">
									<img
										alt=""
										className="card-img-profile"
										src={`${window.location.origin}/img/user.jpg`}
									/>
									<h4 className="card-title">
										<p>
											{this.state.firstname} {this.state.lastname}
										</p>
										<small> {this.state.email}</small>
									</h4>
								</div>
							</div>
						</div>
						<div className="col-sm-8">
							<div className="row">
								<div className="col-sm-12">
									<form method="post" onSubmit={this.handleSubmit}>
										<div id="signup">
											<div className="row">
												<div className="field-wrap  col-md-6">
													<input
														placeholder="FIRST NAME"
														type="text"
														name="firstname"
														required
														value={firstname}
														onChange={this.handleChange}
													/>
												</div>
												<div className="field-wrap  col-md-6">
													<input
														type="text"
														placeholder="LAST NAME"
														required
														value={lastname}
														name="lastname"
														onChange={this.handleChange}
													/>
												</div>
											</div>
											<div className="field-wrap" style={{ clear: 'both' }}>
												<Select
													onChange={this.onSelectChange}
													options={genresOption}
													isMulti={true}
													value={[ ...defaultgenres ]}
													placeholder="SELECT YOUR FAVORITE GENRES"
													className="selectdropdown"
												/>
											</div>
											<div className="field-wrap">
												<Select
													onChange={this.onLanguageSelectionChange}
													options={languagesOption}
													value={[ ...defaultlang ]}
													isMulti={true}
													placeholder="SELECT YOUR PREFERRED LANGUAGES"
													className="selectdropdown"
												/>
											</div>

											<button type="submit" className="button update-btn button-block">
												Update Profile
											</button>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Fragment>
		);
	}
}

export default withRouter(ProfileComponent);
