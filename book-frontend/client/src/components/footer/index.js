import React, { Component, Fragment } from 'react';
import "../../style/scss/footer/index.scss"

class AppFooter extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {

    }


    render() {
        return (
            <Fragment>
                <footer className="footer-section pb-0">
                    <div className="footer-top">
                        <div className="footer-warp">
                            <div className="row d-flex justify-content-around">
                                <div className="widget-item col-lg-3 col-md-3">
                                    <h4>Engeneering</h4>
                                    <ul>
                                        <li><a href="">Applied Studies</a></li>
                                        <li><a href="">Computer Engeneering</a></li>
                                        <li><a href="">Software Engeneering</a></li>
                                        <li><a href="">Informational Engeneering</a></li>
                                        <li><a href="">System Engeneering</a></li>
                                    </ul>
                                </div>
                                <div className="widget-item col-lg-3 col-md-3">
                                    <h4>Graphic Design</h4>
                                    <ul>
                                        <li><a href="">Applied Studies</a></li>
                                        <li><a href="">Computer Engeneering</a></li>
                                        <li><a href="">Software Engeneering</a></li>
                                        <li><a href="">Informational Engeneering</a></li>
                                        <li><a href="">System Engeneering</a></li>
                                    </ul>
                                </div>
                                <div className="widget-item col-lg-3 col-md-3">
                                    <h4>Development</h4>
                                    <ul>
                                        <li><a href="">Applied Studies</a></li>
                                        <li><a href="">Computer Engeneering</a></li>
                                        <li><a href="">Software Engeneering</a></li>
                                        <li><a href="">Informational Engeneering</a></li>
                                        <li><a href="">System Engeneering</a></li>
                                    </ul>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <div className="footer-warp">
                            <ul className="footer-menu">
                                <li><a href="#">Terms & Conditions</a></li>
                                <li><a href="#">Register</a></li>
                                <li><a href="#">Privacy</a></li>
                            </ul>
                            <div className="copyright">
                                Copyright &copy; All rights reserved | This template is made with
<i className="fa fa-heart-o" aria-hidden="true"></i> by <a href="#" target="_blank">BookShelf</a>
                            </div>
                        </div>
                    </div>
                </footer>
            </Fragment>

        );
    }
}

export default AppFooter;
