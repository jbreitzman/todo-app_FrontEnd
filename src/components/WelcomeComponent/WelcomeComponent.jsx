import React, { Component } from "react";
import "../TodoApp/TodoApp.css";
import "../../bootstrap.css";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import HelloWorldService from "../../api/todo/HelloWorldService.js";

class WelcomeComponent extends Component {
    constructor(props) {
        super(props);

        this.retrieveWelcomeMessage = this.retrieveWelcomeMessage.bind(this);
        this.handleSuccessfulResponse = this.handleSuccessfulResponse.bind(this);
        this.state = {
            welcomeMessage: "",
        };
    }
    render() {
        return (
            <>
                <h1>Welcome!</h1>
                <div className="container">
                    Welcome {this.props.match.params.username}, You can manange your todo's <Link to="/todos">Here</Link>
                </div>
                <div className="container">
                    Click here to get a customized welcome message.
                    <br />
                    <button className="btn btn-success" onClick={this.retrieveWelcomeMessage}>
                        Get Welcome Message
                    </button>
                </div>

                <div className="container">
                    <br />
                    {this.state.welcomeMessage}
                </div>
            </>
        );
    }
    retrieveWelcomeMessage() {
        //HelloWorldService.executeHelloWorldService().then((response) => this.handleSuccessfulResponse(response));
        //.catch()

        HelloWorldService.executeHelloWorldServiceWithVar(this.props.match.params.username)
            .then((response) => this.handleSuccessfulResponse(response))
            .catch((err) => {
                this.handleErrorResponse(err);
            });
        //.catch()
    }

    handleSuccessfulResponse(response) {
        this.setState({ welcomeMessage: response.data.message });
        console.log(response.data.message);
    }

    handleErrorResponse(error) {
        console.log(error.response);
        let errorMessage = "";

        if (error.message) {
            errorMessage += error.message;
        }

        if (error.response && error.response.data) {
            errorMessage += error.response.data.message;
        }

        this.setState({ welcomeMessage: errorMessage });
    }
}

export default withRouter(WelcomeComponent);
