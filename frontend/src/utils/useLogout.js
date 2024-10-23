import axios from 'axios'
import { useState ,useContext} from 'react'
import toast from 'react-hot-toast';
import { AuthContext } from '../context/AuthContext';


const useLogout=()=>{
    const{setAuthUser}=useContext(AuthContext)
    const[loading,setLoading]  =useState(false);

    const logout=async()=>{
        setLoading(true)
        try {
            await axios.post('/api/auth/logout')
            setAuthUser(null)
            localStorage.removeItem('chat-user')

        } catch (error) {
            toast.error("Somethong went wrong")
        }
        finally{
            setLoading(false)

        }
    }

    return [loading,logout]
}
export default useLogout