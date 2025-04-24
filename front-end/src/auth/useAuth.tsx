import { useAuthContext } from "./AuthProvider";

const useAuth = () =>{
    const {token, login, logout, isAuthenticated } = useAuthContext();

    return{
        token,
        login,
        logout,
        isAuthenticated
    };
};

export default useAuth

