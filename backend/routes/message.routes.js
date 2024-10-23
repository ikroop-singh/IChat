const express=require('express')
const {sendMessage,getMessage}=require('../controllers/message.controller')
const authorization=require('../middleware/author')


const router=express.Router()

router.post('/send/:id',authorization,sendMessage)
router.get('/:id',authorization,getMessage)

module.exports=router