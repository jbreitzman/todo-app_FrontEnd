import React, { Component } from "react";
import "../TodoApp/TodoApp.css";
import "../../bootstrap.css";
import AuthenticationService from "../AuthenticatedRoute/AuthenticationService";
import { withRouter } from "react-router";

class LoginComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "jbreitzman",
            password: "",
            hasLoginFailed: false,
            showSuccessMessage: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.loginClicked = this.loginClicked.bind(this);
    }
    render() {
        return (
            <div>
                <h1>Login</h1>
                <div className="container">
                    {this.state.hasLoginFailed && <div className="alert alert-warning">Invalid Credentials</div>}
                    {/*this.state.showSuccessMessage && <div>Login Successful</div>*/}
                    User Name: <input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
                    Password: <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
                    <button className="btn btn-success" onClick={this.loginClicked}>
                        Login
                    </button>
                </div>
            </div>
        );
    }

    loginClicked() {
        // AuthenticationService.executeBasicAuthenticationService(this.state.username, this.state.password)
        //     .then(() => {
        //         // Register Username/Password into SessionStorage
        //         AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password);

        //         // Redirect User to Welcome Page
        //         this.props.history.push(`/welcome/${this.state.username}`);

        //         this.setState({ showSuccessMessage: true, hasLoginFailed: false });
        //     })
        //     .catch(() => {
        //         this.setState({ showSuccessMessage: false, hasLoginFailed: true });
        //     });

        AuthenticationService.executeJWTAuthenticationService(this.state.username, this.state.password)
            .then((response) => {
                // Register Username/Password into SessionStorage
                AuthenticationService.registerSuccessfulLoginForJWT(this.state.username, response.data.token);

                // Redirect User to Welcome Page
                this.props.history.push(`/welcome/${this.state.username}`);

                this.setState({ showSuccessMessage: true, hasLoginFailed: false });
            })
            .catch(() => {
                this.setState({ showSuccessMessage: false, hasLoginFailed: true });
            });
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }
}

export default withRouter(LoginComponent);
