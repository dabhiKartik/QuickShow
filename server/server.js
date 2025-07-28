import express from 'express'
import cors from 'cors'
import connectDB from './db/db.js'
import { clerkMiddleware } from '@clerk/express'
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js"



const app=express()
const PORT =3000


//middleware
app.use(express.json())
app.use(cors())
app.use(clerkMiddleware())


// API Routes
app.get("/",(req,res)=> res.send("server are running"))
app.use("/api/inngest", serve({ client: inngest, functions }));




app.listen(PORT,()=>{
     connectDB()
console.log(`http://localhost:${PORT}`)

})