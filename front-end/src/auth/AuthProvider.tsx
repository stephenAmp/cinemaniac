import { useContext, createContext, useState, ReactNode } from 'react';


interface AuthContextType{
    login: (newToken:string) => void;
    logout: () => void;
    isAuthenticated: boolean;
    token: string | null;
}
const AuthContext = createContext<AuthContextType| undefined>(undefined)

interface AuthProviderProps{
    children : ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {

    const [token, setToken] = useState<string | null>(()=> localStorage.getItem('token'));

    const login = (newToken: string) =>{
        localStorage.setItem('token',newToken)
        setToken(newToken)

    };

    const logout = ()=>{
        localStorage.removeItem('token')
        setToken(null)
    };

    const isAuthenticated = !!token;

    return(
        <AuthContext.Provider value={{token,login,logout,isAuthenticated}}>
            {children}
        </AuthContext.Provider>    
    );

};

export const useAuthContext = ():AuthContextType=>{
    const context = useContext(AuthContext)
    if(!context){
        throw new Error('Must be used within AuthProvider')
    }
    return context
}