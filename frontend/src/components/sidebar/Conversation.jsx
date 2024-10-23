import { useContext } from 'react';
import { ConversationContext } from '../../context/ConversationContext';
import { SocketContext } from '../../context/SocketConnection';

const Conversation = ({conversation}) => {	
	const{selectedConversation,setSelectedConversation}=useContext(ConversationContext);
	const isSelected=selectedConversation?._id===conversation?._id
	const{onlineUsers}=useContext(SocketContext);
	const isOnline=onlineUsers?.includes(conversation._id)
	return (
		<>
			<div onClick={()=>setSelectedConversation(conversation)} className={`flex gap-2 items-center ${isSelected && 'bg-sky-500'}  hover:bg-sky-500 rounded p-2 py-1 cursor-pointer`}>
				<div className={`avatar ${isOnline && `online`}`}>
					<div className='w-12 rounded-full'>
						<img
							src={conversation?.profilePic}
						/>
					</div>
				</div>

				<div className='flex flex-col flex-1'>
					<div className='flex gap-3 justify-between'>
						<p className='font-bold text-black-200'>{conversation?.fullName}</p>
						<span className='text-xl'>🎃</span>
					</div>
				</div>
			</div>

			<div className='divider my-0 py-0 h-1' />
		</>
	);
};
export default Conversation;