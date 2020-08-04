import React, { Component } from "react";
import "./TodoApp.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class TodoApp extends Component {
    render() {
        return (
            <div className="TodoApp">
                <Router>
                    <Switch>
                        <Route path="/" exact component={LoginComponent} />
                        <Route path="/login" component={LoginComponent} />
                        <Route path="/welcome" component={WelcomeComponent} />
                        <Route component={ErrorComponent} />
                    </Switch>
                </Router>
            </div>
        );
    }
}

class WelcomeComponent extends Component {
    render() {
        return <div>Welcome jbreitzman</div>;
    }
}

function ErrorComponent() {
    return <div>404 Page not found :(</div>;
}

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
                {this.state.hasLoginFailed && <div>Invalid Credentials</div>}
                {this.state.showSuccessMessage && <div>Login Successful</div>}
                User Name: <input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
                Password: <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
                <button onClick={this.loginClicked}>Login</button>
            </div>
        );
    }

    loginClicked() {
        // TODO: Hardcoded Authentication.
        if (this.state.username === "jbreitzman" && this.state.password === "password") {
            // Redirect User to Welcome Page
            this.props.history.push("/welcome");
            this.setState({ showSuccessMessage: true, hasLoginFailed: false });
        } else {
            this.setState({ showSuccessMessage: false, hasLoginFailed: true });
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }
}

export default TodoApp;
