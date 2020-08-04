import React, { Component } from "react";
import "./TodoApp.css";
import "../../bootstrap.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

class TodoApp extends Component {
    render() {
        return (
            <div className="TodoApp">
                <Router>
                    <HeaderComponent />
                    <Switch>
                        <Route path="/" exact component={LoginComponent} />
                        <Route path="/login" component={LoginComponent} />
                        <Route path="/welcome/:username" component={WelcomeComponent} />
                        <Route path="/todos" component={ListTodosComponent} />
                        <Route component={ErrorComponent} />
                    </Switch>
                    <FooterComponent />
                </Router>
            </div>
        );
    }
}

class WelcomeComponent extends Component {
    render() {
        return (
            <div>
                Welcome {this.props.match.params.username}, You can manange your todo's <Link to="/todos">Here</Link>
            </div>
        );
    }
}

class ListTodosComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [
                { id: 1, description: "Learn React", done: false, targetDate: new Date() },
                { id: 2, description: "Learn Spring", done: false, targetDate: new Date() },
                { id: 3, description: "Travel More", done: false, targetDate: new Date() },
            ],
        };
    }
    render() {
        return (
            <div>
                <h1>List Todos</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Description</th>
                            <th>Is Completed?</th>
                            <th>Target Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.todos.map((todo) => (
                            <tr key={todo.id}>
                                <td>{todo.id}</td>
                                <td>{todo.description}</td>
                                <td>{todo.done.toString()}</td>
                                <td>{todo.targetDate.toString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

function ErrorComponent() {
    return <div>404 Page not found :(</div>;
}

class HeaderComponent extends Component {
    render() {
        return (
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div>
                        <a href="http://www.breitek.io" className="navbar-brand">
                            jbreitzman
                        </a>
                    </div>
                    <ul className="navbar-nav">
                        <li>
                            <Link to="/welcome/jbreitzman" className="nav-link">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/todos" className="nav-link">
                                Todo
                            </Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav navbar-collapse justify-content-end">
                        <li>
                            <Link to="/login" className="nav-link">
                                Login
                            </Link>
                        </li>
                        <li>
                            <Link to="/logout" className="nav-link">
                                Logout
                            </Link>
                        </li>
                    </ul>
                </nav>
            </header>
        );
    }
}

class FooterComponent extends Component {
    render() {
        return (
            <div>
                <hr />
                Footer
            </div>
        );
    }
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
            this.props.history.push(`/welcome/${this.state.username}`);
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
