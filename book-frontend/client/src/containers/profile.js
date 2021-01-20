import React, { Component, Fragment } from 'react';
import '../style/css/profile.scss';
import ProfileComponent from '../components/account/profile';

export default class ProfileContainer extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<section className="banner-sec profile-page">
				<div className="container">
					<ProfileComponent />
				</div>
			</section>
		);
	}
}
