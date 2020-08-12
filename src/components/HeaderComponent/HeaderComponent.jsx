import React, { Component } from "react";
import AuthenticationService from "../AuthenticatedRoute/AuthenticationService";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import "../TodoApp/TodoApp.css";
import "../../bootstrap.css";

class HeaderComponent extends Component {
    render() {
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();

        return (
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div>
                        <a href="http://www.breitek.io" className="navbar-brand">
                            BreiTek LLC
                        </a>
                    </div>
                    <ul className="navbar-nav">
                        {isUserLoggedIn && (
                            <li>
                                <Link to="/welcome/jbreitzman" className="nav-link">
                                    Home
                                </Link>
                            </li>
                        )}
                        {isUserLoggedIn && (
                            <li>
                                <Link to="/todos" className="nav-link">
                                    Todo
                                </Link>
                            </li>
                        )}
                    </ul>
                    <ul className="navbar-nav navbar-collapse justify-content-end">
                        {!isUserLoggedIn && (
                            <li>
                                <Link to="/login" className="nav-link">
                                    Login
                                </Link>
                            </li>
                        )}
                        {isUserLoggedIn && (
                            <li>
                                <Link to="/login" className="nav-link" onClick={AuthenticationService.logout}>
                                    Logout
                                </Link>
                            </li>
                        )}
                    </ul>
                </nav>
            </header>
        );
    }
}

export default withRouter(HeaderComponent);
