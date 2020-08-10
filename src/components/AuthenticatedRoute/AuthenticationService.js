import Axios from "axios";

class AuthenticationService {
    registerSuccessfulLogin(username, password) {
        let basicAuthHeader = "Basic " + window.btoa(username + ":" + password);

        sessionStorage.setItem("authenticatedUser", username);
        this.setupAxiosInterceptors(basicAuthHeader);
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

    setupAxiosInterceptors(basicAuthHeader) {
        Axios.interceptors.request.use((config) => {
            if (this.isUserLoggedIn) {
                config.headers.authorization = basicAuthHeader;
            }
            return config;
        });
    }
}

export default new AuthenticationService();
