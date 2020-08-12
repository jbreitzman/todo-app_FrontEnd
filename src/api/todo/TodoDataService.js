import Axios from "axios";
import { API_URL, JPA_API_URL } from "../../Contants.js";

class TodoDataService {
    retrieveAllTodos(username) {
        return Axios.get(`${JPA_API_URL}/users/${username}/todos`);
    }

    retrieveTodo(username, id) {
        return Axios.get(`${JPA_API_URL}/users/${username}/todos/${id}`);
    }

    deleteTodo(username, id) {
        return Axios.delete(`${JPA_API_URL}/users/${username}/todos/${id}`);
    }

    updateTodo(username, id, todo) {
        return Axios.put(`${JPA_API_URL}/users/${username}/todos/${id}`, todo);
    }

    createTodo(username, todo) {
        return Axios.post(`${JPA_API_URL}/users/${username}/todos/`, todo);
    }
}

export default new TodoDataService();
