import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'



dotenv.config();

mongoose.connect(process.env.MONGO).then(()=>{
    console.log('connect to mongos')
}).catch((err)=>{
    console.log(err)
})

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser())

app.listen(3000,()=>{
    console.log('server listening on port 3000')
})


app.use("/",userRouter)
app.use("/",authRouter)



app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'internal server error'
    return res.status(statusCode).json({
        success: false,
        message,
        statusCode,
    })
})