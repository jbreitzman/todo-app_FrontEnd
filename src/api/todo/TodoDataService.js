import Axios from "axios";

class TodoDataService {
    retrieveAllTodos(username) {
        return Axios.get(`http://localhost:8080/users/${username}/todos`);
    }

    retrieveTodo(username, id) {
        return Axios.get(`http://localhost:8080/users/${username}/todos/${id}`);
    }

    deleteTodo(username, id) {
        return Axios.delete(`http://localhost:8080/users/${username}/todos/${id}`);
    }

    updateTodo(username, id, todo) {
        return Axios.put(`http://localhost:8080/users/${username}/todos/${id}`, todo);
    }

    createTodo(username, todo) {
        return Axios.post(`http://localhost:8080/users/${username}/todos/`, todo);
    }
}

export default new TodoDataService();
