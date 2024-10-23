import Message from "./Message";
import useGetMessages from "../../utils/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import useListenMessage from "../../utils/useListenMessage";
import { useEffect, useRef } from "react";

const Messages = () => {

	const[messages,loading]=useGetMessages();
	useListenMessage()
	const lastMessageRef = useRef();

	useEffect(() => {
		setTimeout(() => {
			lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
		}, 100);
	}, [messages]);

	return (
		<div className='px-4 flex-1 overflow-auto'>
			{
				loading && [...Array(5)].map((_,idx)=><MessageSkeleton key={idx}/>)
            }
			{
				!loading && messages.length>0&&
				messages.map((message)=>{
					return <div ref={lastMessageRef}>

						<Message  message={message} key={message._id}/>
					</div>
					

				})
			}
			{
				!loading && messages.length<=0 && <p className="text-center">Send a message to start conversation</p>
			}
			
			
		</div>
	);
};
export default Messages;