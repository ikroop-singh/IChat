import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ConversationContext } from "../../context/ConversationContext";


const Message = ({message}) => {
    
    const{selectedConversation}=useContext(ConversationContext)
    
    const{authUser}=useContext(AuthContext)   
    const fromMe=authUser._id===message.senderId    
    
    return (
        <div className={fromMe ? 'chat chat-end' : "chat chat-start"} >
            <div className='chat-image avatar'>
                <div className='w-10 rounded-full'>
                    <img src={fromMe ? authUser.profilePic : selectedConversation.profilePic} />
                </div>
            </div>
            <div className={`chat-bubble text-white ${fromMe ? 'bg-blue-500' :'bg-sky-500'}   pb-21`}>{message.message}</div>
            <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{message.createdAt}</div>
        </div>
    );
};
export default Message;