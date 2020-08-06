import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class FooterComponent extends Component {
    render() {
        return (
            <footer className="footer">
                <span className="text-muted">All Rights Reserved 2020 @BreiTek LLC</span>
            </footer>
        );
    }
}

export default withRouter(FooterComponent);
