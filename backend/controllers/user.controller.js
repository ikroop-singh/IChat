const User=require('../models/userModel')


const fetchUserForSidebar=async(req,res)=>{
    try {
        
        const loggedinUser=req.user._id
        const users=await User.find({_id:{$ne:loggedinUser}}).select('-password')
        res.status(200).json(users)
    } catch (error) {
        console.log("error in user controller");
        
        res.status(500).json({error})
    }
}

module.exports=fetchUserForSidebar