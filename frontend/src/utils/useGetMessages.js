import  { useState,useContext, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast';
import { ConversationContext } from '../context/ConversationContext';

const useGetMessages = () => {
    const[loading,setLoading]=useState(false);
    const{messages,selectedConversation,setMessages}=useContext(ConversationContext)

    useEffect(()=>{
        
        const getMessage=async()=>{
    
            setLoading(true)
            try {
                const {data}=await axios.get(`/api/messages/${selectedConversation._id}`);                
                setMessages(data)
            } catch (error) {
                toast.error("Something went wrong")
            }
            finally{
                setLoading(false)
            }
        }
        getMessage()

    },[selectedConversation])

    return [messages,loading]
}

export default useGetMessages