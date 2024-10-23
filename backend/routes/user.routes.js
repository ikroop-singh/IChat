const express=require('express')
const authorization=require('../middleware/author')
const userController=require('../controllers/user.controller')

const router=express.Router()

router.get('/',authorization,userController)

module.exports=router