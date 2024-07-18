import { apiClient } from "./ApiClient";


export const retrieveHelloWorldBean = () => apiClient.get('/hello-world-bean');

export const retrieveHelloWorldPathVariable = (username, token) => apiClient.get(`/hello-world/path-variable/${username}`);

export const executeBasicAuthenticationService = (token) => apiClient.get(`/basic-auth`, {
    headers:{
        Authorization: token
    }
});