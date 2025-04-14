import { useContext, createContext, useState } from 'react';

const AuthContext = createContext()

AuthProvider = ({ children }) => {

    const [token, setToken] = useState(()=> localStorage.getItem('token'));

    const login = (newToken) =>{
        localStorage.setItem('token',newToken)
        setToken(newToken)

    };

    const logout = ()=>{
        localStorage.removeItem('token')
        setToken(null)
    };

    const isAuthenticated = !!token;

    return(
        <AuthContext.Provider value = {{login,logout,isAuthenticated}}>
            {children}
        </AuthContext.Provider>    
    );

};

export const useAuthContext = useContext(AuthContext)