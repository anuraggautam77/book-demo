import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';
import ScrollUpButton from 'react-scroll-up-button';
import PubSub from 'pubsub-js';
import Cookie from '../common/cookie';
import Home from '../containers/home';
import MovieDetails from '../containers/detailpage';
import NoMatch from '../containers/nomatch';
import RegisterContainer from '../containers/register';
import SigninContainer from '../containers/signin';
import ForgotPasswordContainer from '../containers/forgotpassword';
import ResetPasswordContainer from '../containers/resetpassword';
import ProfileContainer from '../containers/profile';
import ActivateUserContainer from '../containers/activateuser';
import LoaderTemplate from '../containers/loader';
import LogoTemplate from '../containers/logo';

class Layout extends Component {
	constructor(props) {
		super(props);
		this.cookieInstance = new Cookie();
		this.state = {
			isLogin: this.cookieInstance.getCookie('context') !== undefined ? true : false || false
		};
	}

	componentDidMount() {
		this.subscribeEvent();
	}

	subscribeEvent() {
		PubSub.subscribe('LOGIN_CHANGE', () => {
			this.toggleState();
		});
		PubSub.subscribe('LOADER_HIDE_SHOW', (mgs, flag) => {
			const loaderEle = document.getElementsByClassName('application-loader')[0];
			if (flag) {
				loaderEle.classList.remove('dn');
			} else {
				loaderEle.classList.add('dn');
			}
		});
	}
	toggleState() {
		this.setState({ isLogin: !this.state.isLogin });
	}

	logoutHandler() {
		this.cookieInstance.removeAll();
		this.toggleState();
	}

	loginlogoutTemplate() {
		let temp;
		if (!this.state.isLogin) {
			temp = (() => {
				return (
					<Fragment>
						<Link to="/signin" className="nav-link">
							Login
						</Link>
					</Fragment>
				);
			})();
		} else {
			temp = (() => {
				return (
					<Fragment>
						<Link to="/" className="nav-link" href="javascript:void(0)">
							&nbsp;
							{(() => ` Welcome ${this.cookieInstance.getCookie('name')} !`)()}
						</Link>

						<Link to="/profile" className="nav-link" href="javascript:void(0)">
							&nbsp; Profile
						</Link>

						<a className="nav-link" href="javascript:void(0)" onClick={() => this.logoutHandler()}>
							&nbsp;Logout
						</a>
					</Fragment>
				);
			})();
		}
		return temp;
	}

	render() {
		return (
			<Router>
				<Fragment>
					<header>
						<div className="top-head left">
							<div className="container-fluid">
								<div className="row">
									<div className="col-md-3 col-12">
										<Link to="/" className="nav-link">
											<LogoTemplate />
										</Link>
									</div>
									<div className="col-md-3 col-12" />
									<div className="col-md-6 col-12 ml-auto admin-bar hidden-sm-down">
										<nav className="nav nav-inline float-right">{this.loginlogoutTemplate()}</nav>
									</div>
								</div>
							</div>
						</div>
					</header>
					<div className={`application-loader dn`}>
						<div className="loader-wrapper">
							<LoaderTemplate />
						</div>
					</div>

					<Fragment>
						<Switch>
							<Route path="/" exact component={() => <Home isLogin={this.state.isLogin} />} />
							<Route path="/detail/:id/:movename" exact component={MovieDetails} />
							<Route path="/signup" exact component={RegisterContainer} />
							<Route path="/signin" exact component={SigninContainer} />
							<Route
								path="/profile"
								exact
								component={() => (this.state.isLogin ? <ProfileContainer /> : <Redirect to="/" />)}
							/>
							<Route path="/reset/:token" exact component={ResetPasswordContainer} />
							<Route path="/activate/:jwt" exact component={ActivateUserContainer} />
							<Route path="/forgotpassword" exact component={ForgotPasswordContainer} />
							<Route path="*" exact component={NoMatch} />
						</Switch>
					</Fragment>
					<ScrollUpButton style={{ width: 50 }} ToggledStyle={{ right: 10 }} />
				</Fragment>
			</Router>
		);
	}
}

export default Layout;
