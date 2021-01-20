import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';
import ScrollUpButton from 'react-scroll-up-button';


import HeaderComponent from '../components/header/header'
import AppFooter from '../components/footer/index'
import HowItWorks from '../components/static/howitworks';
import FeatureList from '../components/featurelist/index'


class AppShell extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        return (
            <Router>
                <Fragment>
                    <HeaderComponent />
                        <FeatureList />
                        <HowItWorks />
                        <AppFooter />
                    <ScrollUpButton style={{ width: 50 }} ToggledStyle={{ right: 10 }} />
                </Fragment>
            </Router>
        );
    }
}




export default AppShell;
