import Axios from "axios";

class HelloWorldService {
    executeHelloWorldService() {
        return Axios.get("http://localhost:8080/hello-world");
    }

    executeHelloWorldServiceWithVar(name) {
        return Axios.get(`http://localhost:8080/hello-world-var/${name}`);
    }
}

export default new HelloWorldService();
