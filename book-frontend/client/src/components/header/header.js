import React, { Component } from 'react';
import "../../style/scss/headernav/index.scss"

class HeaderComponent extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <header className="">
                <div className="header-content black-bg">
                    <a href="/?home=1" className="logo">
                        <i className="iconfont icon_logo"></i>
                                     &nbsp;Book Shelf
                                 </a>
                    <div className="nav-menu">
                        <div className="nav-item">
                            <span>Library<i className="iconfont icon_broad_back"></i></span>
                            <div className="nav-menu-drop" style={{ "display": "none" }}>
                                <ul className="nav-listing row">
                                    <li className="col-lg-3 col-md-3">
                                        <p>Interactive Prototyping</p>
                                        <a href="/mockplus-rp" target="_blank">
                                            <h3>Mockplus RP</h3>
                                            <p>The best prototyping tool for web and mobile apps</p>
                                        </a>
                                    </li>
                                    <li className="col-lg-3 col-md-3">
                                        <p>Design Collaboration</p>
                                        <a href="/mockplus-idoc?home=1" target="_blank">
                                            <h3>Mockplus iDoc</h3>
                                            <p>Streamline collaboration between design and development</p>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="nav-item">
                            <a href="/enterprise">University</a>
                        </div>
                        <div className="nav-item">
                            <span>Curriculam<i className="iconfont icon_broad_back"></i></span>
                            <div className="nav-menu-drop" style={{ "display": "none" }}>
                                <ul className="nav-listing row">
                                    <li className="col-lg-3 col-md-3">
                                        <p>Interactive Prototyping</p>
                                        <a href="/mockplus-rp" target="_blank">
                                            <h3>Mockplus RP</h3>
                                            <p>The best prototyping tool for web and mobile apps</p>
                                        </a>
                                    </li>
                                    <li className="col-lg-3 col-md-3">
                                        <p>Design Collaboration</p>
                                        <a href="/mockplus-idoc?home=1" target="_blank">
                                            <h3>Mockplus iDoc</h3>
                                            <p>Streamline collaboration between design and development</p>
                                        </a>
                                    </li>
                                </ul>
                            </div>


                        </div>
                        <div className="nav-item">
                            <a target="_blank" href="#">Novels</a>
                        </div>
                    </div>
                    <div className="login-container">

                    </div>

                    <i className="fa fa-bars ph-menu-icon" aria-hidden="true"></i>
                    <div className="ph-head">
                        <a href="#" className="logo" target="_blank">
                            <i className="iconfont icon_logo"></i>
                                    &nbsp;Book Shelf
                                </a>
                        <i className="fa fa-times" aria-hidden="true"></i>
                    </div>
                </div>
            </header>

        );
    }
}

export default HeaderComponent;
