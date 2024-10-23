import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const useConversationsGet = () => {
  const [loading,setLoading]=useState(false);
  const [conversations,setConversations]=useState(null);


  useEffect(()=>{
    const getConversations=async()=>{
      setLoading(true)
      try {
        const data=await axios.get("/api/users")        
        setConversations(data.data)
        
      } catch (error) {
        toast.error("Something went wrong")
      }
      finally{
        setLoading(false)
      }
    }
    getConversations();
  },[])

  return [loading,conversations]
}

export default useConversationsGet