import React, { Component } from "react";
import { withRouter } from "react-router";
import "../TodoApp/TodoApp.css";
import "../../bootstrap.css";
import moment from "moment";
import TodoDataService from "../../api/todo/TodoDataService.js";
import AuthenticationService from "../AuthenticatedRoute/AuthenticationService";

class ListTodosComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            message: null,
        };
    }

    componentDidMount() {
        this.refreshTodos();
    }

    refreshTodos() {
        let username = AuthenticationService.getAuthenticatedUser();
        TodoDataService.retrieveAllTodos(username).then((response) => {
            this.setState({ todos: response.data });
        });
    }

    deleteTodoClicked(id) {
        let username = AuthenticationService.getAuthenticatedUser();
        TodoDataService.deleteTodo(username, id).then((response) => {
            this.setState({ message: `Delete of Todo ${id} successful!` });
            this.refreshTodos();
        });
    }

    updateTodoClicked(id) {
        // Redirect User to Todo Component Page
        this.props.history.push(`/todos/${id}`);
    }

    addTodoClicked = () => {
        // Redirect User to Todo Component Page
        this.props.history.push(`/todos/-1`);
    };

    render() {
        return (
            <div>
                <h1>List Todos</h1>
                {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Is Completed?</th>
                                <th>Target Date</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.todos.map((todo) => (
                                <tr key={todo.id}>
                                    <td>{todo.description}</td>
                                    <td>{todo.done.toString()}</td>
                                    <td>{moment(todo.targetDate).format("YYYY-MM-DD")}</td>
                                    <td>
                                        <button onClick={() => this.updateTodoClicked(todo.id)} className="btn btn-success">
                                            Update
                                        </button>
                                    </td>
                                    <td>
                                        <button onClick={() => this.deleteTodoClicked(todo.id)} className="btn btn-danger">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="row">
                        <button onClick={this.addTodoClicked} className="btn btn-success">
                            Add
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(ListTodosComponent);
