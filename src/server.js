import dotenv from 'dotenv'
import express from 'express'
import bodyParser from 'body-parser'
import { connectDB } from './db/connectDB.js'
import router from './routes/router.js'
import cors from "cors"
import helmet from 'helmet'
dotenv.config()

const app = express()

app.use(cors())
app.use(helmet())
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }));

connectDB()
const port = process.env.PORT || 3000

app.get("/", (req, res) => {
  res.send("🎉 Backend is working!");
});

app.use('/api/user', router)

app.listen(port, ()=>{
    console.log(`server is running on port ${port}` )
})