import React, { Component, Fragment } from 'react';
import ArtPage from './articlepage';
import ContextPage from './contextpage';

export default class Home extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {}

	render() {
		return (
			<Fragment>
				{(() => {
					if (this.props.isLogin) {
						return <ContextPage />;
					} else {
						return <ArtPage />;
					}
				})()}
			</Fragment>
		);
	}
}
