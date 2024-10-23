import React, { useState,useContext } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast';
import { ConversationContext } from '../context/ConversationContext';

const useSendMessage = () => {
    const[loading,setLoading]=useState(false);
    const{messages,selectedConversation,setMessages}=useContext(ConversationContext)

    const sendMessage=async(message)=>{        
        if(!message)return

        setLoading(true)
        try {
            const {data}=await axios.post(`/api/messages/send/${selectedConversation._id}`,{message});   
            setMessages([...messages,data])
        } catch (error) {
            toast.error("Something went wrong")
        }
        finally{
            setLoading(false)
        }
    }
    return [loading,sendMessage]
}

export default useSendMessage