import { createContext, useContext, useState } from "react";
import { executeBasicAuthenticationService } from "../api/HelloWorldApiService";
import { apiClient } from "../api/ApiClient";

// create a context
export const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext);

//2: share the created context with other components 
export default function AuthProvider({ children }) {
    //3: put some state in teh context
    const [isAuthenticated, setIsAuthenticated] = useState(false);


    const [username, setUsername] = useState(null);


    const [token, setToken] = useState(null);



    // function login(username, password){
    //     if (username === 'nerdy' && password === 'password@123') {
    //         setIsAuthenticated(true);
    //         setUsername(username);
    //         return true;
    //     }
    //     else {
    //         setIsAuthenticated(false)
    //         setUsername(null);
    //         return false;
    //     }
    // }

    async function login(username, password) {
        const batoken = 'Basic ' + window.btoa(username + ":" + password)


        try {
            const response = await executeBasicAuthenticationService(batoken);
            if (response.status === 200) {
                setIsAuthenticated(true);
                setUsername(username);
                setToken(batoken);

                apiClient.interceptors.request.use(
                    (config) => {
                        config.headers.Authorization = batoken;
                        return config;
                    }
                )

                return true;
            }
            else {
                logout()
                return false;
            }
        }
        catch (error) {
            logout()
            return false;
        }
    }

    function logout() {
        setIsAuthenticated(false);
        setToken(null);
        setUsername(null);
    }



    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, username, token }}>
            {children}
        </AuthContext.Provider>
    )
}