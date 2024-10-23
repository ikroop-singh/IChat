import { useState } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../utils/useSendMessage";

const MessageInput = () => {

	const[message,setMessage]=useState('');
	const[loading,sendMessage]=useSendMessage();
	const handleSubmit=async(e)=>{
		e.preventDefault()
		await sendMessage(message);
		setMessage('')
	}
	return (
		<form className='px-4 my-3 '>
			<div className='w-full relative'>
				<input
					value={message}
					type='text'
					className='border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white'
					placeholder='Send a message'
					onChange={(e)=>setMessage(e.target.value)}
				/>
				<button onClick={handleSubmit}  className='absolute inset-y-0  end-0 flex items-center pe-3'>
					{
						loading
						?
						<span className="loading loading-spinner bg-white"></span> 
						:
						<BsSend className="text-white"/>
					}
				</button>
			</div>
		</form>
	);
};
export default MessageInput;