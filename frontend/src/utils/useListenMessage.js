import { useContext, useEffect } from "react";
import { SocketContext } from "../context/SocketConnection";
import { ConversationContext } from "../context/ConversationContext";
import notificationSound from '../assets/ring_audio.mp3'

const useListenMessage = () => {
    const{messages,setMessages}=useContext(ConversationContext);
    const{socket,io}=useContext(SocketContext)

    useEffect(()=>{
        socket.on('newMessage',(newMessage)=>{     
            setMessages([...messages,newMessage])
            const audio=new Audio(notificationSound)
            audio.play()
        })

        return ()=>socket.off("newMessage")
    },[messages])
}

export default useListenMessage