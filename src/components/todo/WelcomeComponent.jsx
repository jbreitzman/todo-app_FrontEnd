import React, { Component } from "react";
import "./TodoApp.css";
import "../../bootstrap.css";
import { Link } from "react-router-dom";

class WelcomeComponent extends Component {
    render() {
        return (
            <>
                <h1>Welcome!</h1>
                <div className="container">
                    Welcome {this.props.match.params.username}, You can manange your todo's <Link to="/todos">Here</Link>
                </div>
            </>
        );
    }
}

export default WelcomeComponent;
