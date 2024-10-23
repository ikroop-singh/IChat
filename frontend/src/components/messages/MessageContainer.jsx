import { useContext, useEffect } from "react";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import{TiMessages} from 'react-icons/ti'
import { ConversationContext } from "../../context/ConversationContext";
import { AuthContext } from "../../context/AuthContext";

const MessageContainer = () => {
	const{authUser}=useContext(AuthContext)
	
	const{selectedConversation,setSelectedConversation}=useContext(ConversationContext)
	useEffect(()=>{
		return ()=>setSelectedConversation(null)
	},[])

	return (
		<div className='md:min-w-[450px] flex flex-col'>
            {
                selectedConversation
                ?
			<>
				{/* Header */}
				<div className='bg-slate-500 px-4 py-2 mb-2'>
					<span  className='text-white'>To:</span> <span className='text-white font-bold'>{selectedConversation.fullName}</span>
				</div>

				<Messages />
				<MessageInput />
			</>
            :
            <NoChatSelected authUser={authUser}/>
            }
		</div>
	);
};
export default MessageContainer;

const NoChatSelected = ({authUser}) => {
	
	return (
		<div className='flex items-center justify-center w-full h-full'>
			<div className='px-4 text-center sm:text-lg md:text-xl text-slate-500 font-semibold flex flex-col items-center gap-2'>
				<p>Welcome 👋  {authUser.fullName}❄</p>
				<p>Select a chat to start messaging</p>
				<TiMessages className='text-3xl md:text-6xl text-center' />
			</div>
		</div>
	);
};