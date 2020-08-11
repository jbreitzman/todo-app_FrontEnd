import Axios from "axios";

class AuthenticationService {
    executeBasicAuthenticationService(username, password) {
        return Axios.get("http://localhost:8080/basicauth", {
            headers: {
                authorization: this.createBasicAuthToken(username, password),
            },
        });
    }

    executeJWTAuthenticationService(username, password) {
        return Axios.post("http://localhost:8080/authenticate", { username, password });
    }

    createBasicAuthToken(username, password) {
        return "Basic " + window.btoa(username + ":" + password);
    }

    createJWTToken(token) {
        return "Bearer " + token;
    }

    registerSuccessfulLogin(username, password) {
        sessionStorage.setItem("authenticatedUser", username);
        this.setupAxiosInterceptors(this.createBasicAuthToken(username, password));
    }

    registerSuccessfulLoginForJWT(username, token) {
        sessionStorage.setItem("authenticatedUser", username);
        this.setupAxiosInterceptors(this.createJWTToken(token));
    }

    logout() {
        sessionStorage.removeItem("authenticatedUser");
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem("authenticatedUser");
        if (user === null) return false;
        return true;
    }

    getAuthenticatedUser() {
        let user = sessionStorage.getItem("authenticatedUser");
        if (user === null) return "";
        return user;
    }

    setupAxiosInterceptors(token) {
        Axios.interceptors.request.use((config) => {
            if (this.isUserLoggedIn) {
                config.headers.authorization = token;
            }
            return config;
        });
    }
}

export default new AuthenticationService();
