import React, { Component, Fragment } from 'react';
import "../../style/scss/static/index.scss"

class HowItWorks extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {

    }


    render() {
        return (
            <Fragment>
                <div className="section how_it_works">

                    <div className="wrapper row d-flex justify-content-around">
                        <div className="section_title col-lg-12 text-center col-md-12">How it works</div>
                        <div className="step text-center col-lg-3 col-md-3">

                            <div>
                                 <i className="numeral">1</i>
                            <div className="text">
                                <h4>Create your profile</h4>
                                <div className="details">
                                Sign Up for free . (It's 100% free.)
                                   
                                </div>
                            </div>
                            </div>

                        </div>
                        <div className="step text-center col-lg-3 col-md-3">
                            <i className="numeral">2</i>
                            <div className="text">
                                <h4>Search Books  </h4>
                                <div className="details">
                                    Browse jobs by location, role, market, technology, salary. Click Yes on companies you're interested in.
</div>
                            </div>
                        </div>
                        <div className="step text-center col-lg-3 col-md-3">
                            <i className="numeral">3</i>
                            <div className="text">
                                <h4>Connect with book owner</h4>
                                <div className="details">
                                    Startups get notified when you click Yes. You'll be introduced via email to startups that say Yes to you.
</div>
                            </div>
                        </div>
                        <div className="step text-center col-lg-3 col-md-3">
                            <i className="numeral">4</i>
                            <div className="text">
                                <h4>Make a Deal</h4>
                                <div className="details">
                                    Buy or exchange a book   
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>

        );
    }
}

export default HowItWorks;
