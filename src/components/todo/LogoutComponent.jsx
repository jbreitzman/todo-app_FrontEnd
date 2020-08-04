import React, { Component } from "react";
import { withRouter } from "react-router";
import "./TodoApp.css";
import "../../bootstrap.css";

class LogoutComponent extends Component {
    render() {
        return (
            <div>
                <h1>You are logged out.</h1>
                <div className="container">Thank you for using our Application.</div>
            </div>
        );
    }
}

export default withRouter(LogoutComponent);
