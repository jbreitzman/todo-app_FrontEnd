import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AuthenticatedRoute from "../AuthenticatedRoute/AuthenticatedRoute";
import LoginComponent from "../LoginComponent/LoginComponent";
import HeaderComponent from "../HeaderComponent/HeaderComponent";
import FooterComponent from "../FooterComponent/FooterComponent";
import { ErrorComponent } from "../ErrorComponent/ErrorComponent";
import LogoutComponent from "../LogoutComponent/LogoutComponent";
import ListTodosComponent from "../ListTodosComponent/ListTodosComponent";
import WelcomeComponent from "../WelcomeComponent/WelcomeComponent";
import "./TodoApp.css";
import "../../bootstrap.css";
import TodoComponent from "../TodoComponent/TodoComponent";

class TodoApp extends Component {
    render() {
        return (
            <div className="TodoApp">
                <Router>
                    <HeaderComponent />
                    <Switch>
                        <Route path="/" exact component={LoginComponent} />
                        <Route path="/login" component={LoginComponent} />
                        <AuthenticatedRoute path="/todos/:id" component={TodoComponent} />
                        <AuthenticatedRoute path="/welcome/:username" component={WelcomeComponent} />
                        <AuthenticatedRoute path="/todos" component={ListTodosComponent} />
                        <AuthenticatedRoute path="/logout" component={LogoutComponent} />
                        <Route component={ErrorComponent} />
                    </Switch>
                    <FooterComponent />
                </Router>
            </div>
        );
    }
}

export default TodoApp;
