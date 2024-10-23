import axios from 'axios'
import { useState,useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../context/AuthContext';


const useLogin = () => {
    const[loading,setLoading]=useState(false);
    const{setAuthUser}=useContext(AuthContext)

    const login=async(input)=>{
        setLoading(true)
        
        if(!validateField(input)){
            setLoading(false)
            return 
        }

        try {
            const res=await axios.post('/api/auth/login',input);            
            localStorage.setItem("chat-user",JSON.stringify(res.data))
            setAuthUser(res.data)
        } catch (error) {
            toast.error(error.response.data.error)
        }
        finally{
            setLoading(false)
        }
        
    }

    return [loading,login]
}

const validateField=(input)=>{
    
    if(!input.username || !input.password){
        toast.error('Fill out all fields')
        return false
    }
    else if(input.password.length < 6){
        toast.error('Password length must be greater than 5')
        return false
    }
    return true;
}

export default useLogin