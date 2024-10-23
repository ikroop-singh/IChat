import React, { useContext, useState } from 'react'

import { IoSearchSharp } from "react-icons/io5";
import useConversationsGet from '../../utils/useConversationsGet';
import { ConversationContext } from '../../context/ConversationContext';
import toast from 'react-hot-toast';

const Search = () => {
	const[loading,conversations]=useConversationsGet()
	const[search,setSearch]=useState('');
	const{setSelectedConversation}=useContext(ConversationContext)

	const handleSubmit=(e)=>{
		e.preventDefault()
		if(!search ){
			return
		}
		console.log(conversations);
		
		const conversation=conversations.find((c)=>c.fullName.toLowerCase()===search.toLowerCase())
		if(!conversation){
			toast.error('No such user')
		}
		else{
			setSelectedConversation(conversation)
		}		
	}

	return (
		<form className='flex items-center gap-2'>
			<input onChange={(e)=>setSearch(e.target.value)} type='text' placeholder='Search…' className='input input-bordered rounded-full' />
			<button type='submit' onClick={handleSubmit} className='btn btn-circle bg-sky-500 text-white'>
				<IoSearchSharp className='w-6 h-6 outline-none' />
			</button>
		</form>
	);
};
export default Search;