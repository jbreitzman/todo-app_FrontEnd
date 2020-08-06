import Axios from "axios";

class TodoDataService {
    retrieveAllTodos(username) {
        return Axios.get(`http://localhost:8080/users/${username}/todos`);
    }

    deleteTodo(username, id) {
        return Axios.delete(`http://localhost:8080/users/${username}/todos/${id}`);
    }
}

export default new TodoDataService();
