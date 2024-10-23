const express=require('express')

const authRoute=express.Router()
const {login,signup,logout}=require('../controllers/auth.controllers')


authRoute.post('/login',login)

authRoute.post('/signup',signup)

authRoute.post('/logout',logout)

module.exports= authRoute
