import React, { Component, Fragment } from "react";
import spoken from "../../../../node_modules/spoken/build/spoken.js";
class SearchPage extends Component {

    constructor(props) {
        super(props);
        this.micHandler = this.micHandler.bind(this);
        this.state = {
            searchtext: ""
        }

    }

    micHandler() {
        spoken.say('Search any keyword.').then(speech => {
            spoken.listen.on.partial(ts => console.log(ts));
            spoken.listen().then(transcript => {
                spoken.say(`keyword is ${transcript}`);
                this.setState({ "searchtext": transcript });

            })
                .catch(error => console.warn(error.message))
        })
    }

    render() {
        return (
            <Fragment>
                <div className="input-group admin-bar">
                    <div className="input-group-prepend">
                        <button className="btn btn-danger" onClick={this.micHandler} type="button">
                            <i className="fa fa-microphone"></i>
                        </button>
                    </div>
                    <input onChange={e => this.setState({ "searchtext": e.target.value })}
                        type="text" className="form-control col-md-12"
                        placeholder="" aria-label="" value={this.state.searchtext}
                        aria-describedby="basic-addon1" />
                    <div className="input-group-prepend">
                        <button className="btn btn-danger" type="button">
                            <i className="fa fa-search"></i>
                        </button>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default SearchPage;