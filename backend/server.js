const express=require('express')
const dotenv=require('dotenv')
const cookieParser=require('cookie-parser')
const path=require('path')

const authRoutes=require('./routes/auth.routes')
const messageRoutes=require('./routes/message.routes.js')
const userRoutes=require('./routes/user.routes')
const {server,io,app}=require('./socket/socket.js')


const connectToMongo =require('./db/connection')

dotenv.config()
const PORT=process.env.PORT ||5000
// const app=express()

app.use(express.json())
app.use(cookieParser())

app.use('/api/auth',authRoutes)
app.use('/api/messages',messageRoutes)
app.use('/api/users',userRoutes)
app.use(express.static(path.join(__dirname,'../frontend/dist')))

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
});

server.listen(PORT,()=>{    
    connectToMongo()
    console.log(`server running on http://localhost:${PORT}`);
})