import React, { Component } from "react";
import moment from "moment";
import { Formik, Form, Field, ErrorMessage } from "formik";
import TodoDataService from "../../api/todo/TodoDataService";
import AuthenticationService from "../AuthenticatedRoute/AuthenticationService";

class TodoComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            description: "",
            targetDate: moment(new Date()).format("YYYY-MM-DD"),
        };
    }

    onSubmit = (values) => {
        let username = AuthenticationService.getAuthenticatedUser();
        if (this.state.id === -1) {
            TodoDataService.createTodo(username, {
                description: values.description,
                targetDate: values.targetDate,
            }).then(() => {
                this.props.history.push("/todos");
            });
        } else {
            TodoDataService.updateTodo(username, this.state.id, {
                id: this.state.id,
                description: values.description,
                targetDate: values.targetDate,
            }).then(() => {
                this.props.history.push("/todos");
            });
        }
    };

    componentDidMount() {
        if (this.state.id === -1) {
            return;
        } else {
            let username = AuthenticationService.getAuthenticatedUser();
            TodoDataService.retrieveTodo(username, this.state.id).then((response) => {
                this.setState({
                    description: response.data.description,
                    targetDate: moment(response.data.targetDate).format("YYYY-MM-DD"),
                });
            });
        }
    }

    validate(values) {
        let errors = {};
        if (!values.description) {
            errors.description = "You must enter a description";
        } else if (values.description.length < 5) {
            errors.description = "Descriptions must be at least 5 Characters.";
        }

        if (!moment(values.targetDate).isValid()) {
            errors.targetDate = "Enter a valid Target Date";
        }
        return errors;
    }

    render() {
        let description = this.state.description;
        let targetDate = this.state.targetDate;
        return (
            <div>
                <h1>Todo</h1>
                <div className="container">
                    <Formik initialValues={{ description: description, targetDate: targetDate }} onSubmit={this.onSubmit} validateOnChange={false} validateOnBlur={false} validate={this.validate} enableReinitialize={true}>
                        {(props) => (
                            <Form>
                                <ErrorMessage name="description" component="div" className="alert alert-warning" />
                                <ErrorMessage name="targetDate" component="div" className="alert alert-warning" />
                                <fieldset className="form-group">
                                    <label>Description</label>
                                    <Field className="form-control" type="text" name="description" />
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Target Date</label>
                                    <Field className="form-control" type="date" name="targetDate" />
                                </fieldset>
                                <button className="btn btn-success" type="submit">
                                    Save
                                </button>
                            </Form>
                        )}
                    </Formik>
                </div>
                <div>Todo Component for Id - {this.props.match.params.id}</div>
            </div>
        );
    }
}

export default TodoComponent;
