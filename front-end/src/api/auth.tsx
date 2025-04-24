import axios from 'axios';
import { handleError } from '@/utils/errorHandling';
import { LoginResponse, RegisterResponse } from '@/schema/auth';

const API = axios.create({
    baseURL: 'http://localhost:8000'
});

interface loginUserType{
    username:string;
    password:string;
}

interface registerUserType{
    email: string;
    name:string;
    password:string
}

export const loginAPI = async({username,password}:loginUserType) =>{
    try{
    const res = await API.post<LoginResponse>('/login', {username, password})
    return res.data
    }catch(error){
        handleError(error)
    }
}

export const registerAPI = async({email, name, password}:registerUserType)=>{
    try{
        const res = await API.post<RegisterResponse>('/register',{email, name, password})
        return res.data
    }catch(error){
        handleError(error)
    }
}

export const fetchProtectData = async(token:string)=>{
    const res = await API.get('/dashboard',{
        headers:{
            Authorization: `Bearer ${token}`
        },
    });

    return res.data;
};