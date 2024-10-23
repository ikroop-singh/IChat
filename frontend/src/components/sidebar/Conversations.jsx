import Conversation from "./Conversation";
import useConversationsGet from "../../utils/useConversationsGet";
const Conversations = () => {
	
	const[loading,conversations]=useConversationsGet()
	
	return (
		<div className='py-2 flex flex-col overflow-auto'>
			{	
			
				conversations?.map((conversation)=>{
					return <Conversation key={conversation._id} conversation={conversation}/>

				})
			
			}
			
		</div>
	);
};
export default Conversations;