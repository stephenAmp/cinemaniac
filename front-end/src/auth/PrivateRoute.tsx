import { ReactNode } from 'react'
import useAuth from "./useAuth";
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps{
    children: ReactNode
}
const PrivateRoute = ({ children }: PrivateRouteProps)=>{
    const { isAuthenticated } = useAuth()
    return isAuthenticated ? children : <Navigate to ='/'/>
};

export default PrivateRoute