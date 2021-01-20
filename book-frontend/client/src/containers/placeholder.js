import React, { Component } from "react";
import '../style/css/placeholder.scss';
export default class Placeholder extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className="placeholder">
                <div className="ph-item">
                    <div className="ph-col-12">
                        <div className="ph-picture"></div>
                        <div className="ph-row">
                            <div className="ph-col-8">
                            </div>
                            <div className="ph-col-4 empty">
                            </div>
                            <div className="ph-col-12">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
