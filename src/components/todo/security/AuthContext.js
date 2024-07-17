import { createContext, useContext, useState } from "react";

// create a context
export const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext);

//2: share the created context with other components 
export default function AuthProvider({ children }) {
    //3: put some state in teh context
    const [isAuthenticated, setIsAuthenticated] = useState(false);


    function login(username, password){
        if (username === 'nerdy' && password === 'password@123') {
            setIsAuthenticated(true);
            return true;
        }
        else {
            setIsAuthenticated(false)
            return false;
        }
    }

    function logout(){
        setIsAuthenticated(false);
    }



    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}