const Message = require('../models/messageModel')
const Conversation = require('../models/conversation.models')
const {getReceiverSocketId,io}=require('../socket/socket')

const sendMessage = async (req, res) => {
    try {

        const { id: receiverId } = req.params;
        const senderId = req.user._id;
        
        const { message } = req.body;
        

        let conversation = await Conversation.findOne({
            participants: {
                $all: [senderId, receiverId]
            }
        })

        if (!conversation) {
            conversation = await Conversation.create({ participants: [senderId, receiverId] })
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message
        })

        conversation.messages.push(newMessage._id)
        // await newMessage.save()
        // await conversation.save()

        await Promise.all([newMessage.save(),conversation.save()]) //This is the optimized approach to do this as all the promises in array runs parallely

        const receiverSocketId=getReceiverSocketId(receiverId);
        if(receiverSocketId){
            // io.to(<socketId>) is used to send event to specific client
            io.to(receiverSocketId).emit('newMessage',newMessage)
        }

        res.status(201).json(newMessage)       

    } catch (error) {
        console.log(error)
        res.status(400).json({error:"error in controller"})
    }
}
const getMessage=async(req,res)=>{
    const{id:receiverId}=req.params;
    const senderId=req.user._id;
    
    const conversation=await Conversation.findOne({
        participants:{
            $all:[senderId,receiverId]
        }
    }).populate('messages')

    if(!conversation){
        res.status(200).json([])
    }
    else
        res.status(200).json(conversation.messages)
}

module.exports = { sendMessage ,getMessage}