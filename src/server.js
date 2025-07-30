import dotenv from 'dotenv'
import express from 'express'
import bodyParser from 'body-parser'
import { connectDB } from './db/connectDB.js'
import router from './routes/router.js'
import cors from "cors"
import helmet from 'helmet'
import { createServer } from 'http'
import { Server } from 'socket.io'
dotenv.config()

const app = express()
const server = createServer(app)
const io = new Server(server, {
    cors: {
    origin: "https://social-media-frontend-ashy.vercel.app",  
    methods: ["GET", "POST"]
  }
})

app.use(cors())
app.use(helmet())
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }));

connectDB()
const port = process.env.PORT || 3000

app.get("/", (req, res) => {
  res.send("🎉 Backend is working!");
});

io.on("connection", (socket) => {
  // console.log("server runing", socket.id)

  socket.on("message", (data) => {
    console.log("Message from client:", data)
    io.emit("message", data)
  })
})

app.use('/api/user', router)

server.listen(port, ()=>{
    console.log(`server is running on port ${port}` )
})