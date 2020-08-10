import Axios from "axios";

class HelloWorldService {
    executeHelloWorldService() {
        return Axios.get("http://localhost:8080/hello-world");
    }

    executeHelloWorldServiceWithVar(name) {
        let username = "jbreitzman";
        let password = "password";

        let basicAuthHeader = "Basic " + window.btoa(username + ":" + password);

        return Axios.get(`http://localhost:8080/hello-world-var/${name}`, {
            headers: {
                authorization: basicAuthHeader,
            },
        });
    }
}

export default new HelloWorldService();
