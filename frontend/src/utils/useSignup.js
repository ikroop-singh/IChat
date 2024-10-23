import axios from 'axios'
import { useState,useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../context/AuthContext';


const useSignup = () => {
    const[loading,setLoading]=useState(false);
    const{setAuthUser}=useContext(AuthContext)


    const signup=async(input)=>{
        
        setLoading(true)
        
        if(!validateField(input)){
            setLoading(false)
            return 
        }

        try {
            const res=await axios.post('/api/auth/signup',input);
            localStorage.setItem("chat-user",JSON.stringify(res.data))
            setAuthUser(res.data)
        } catch (error) {
            toast.error('Something went wrong')
        }
        finally{
            setLoading(false)
        }
        
    }

    return [loading,signup]
}

const validateField=(input)=>{
    
    if(!input.fullName || !input.username || !input.password || !input.confirmPassword || !input.gender){
        toast.error('Fill out all fields')
        return false
    }
    else if(input.password!==input.confirmPassword){
        toast.error('Passwords not matching')
        return false
    }
    else if(input.password.length < 6){
        toast.error('Password length must be greater than 5')
        return false
    }
    return true;
}

export default useSignup