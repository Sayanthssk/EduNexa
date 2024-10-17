import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import route from './routes/userRoutes.js'

/* connection of express to the backend */
const app = express()

/* connection of the cors and body-parser */
app.use(cors())
app.use(bodyParser.json())

/* config fot dotenv */
dotenv.config()

const PORT = process.env.PORT
const MONGO_URI = process.env.MONGO_URI

/* connecting mongo to the backend */
mongoose.connect(MONGO_URI).then (() => {
    console.log('DB connected to successfully')

}).catch((err) => {
    console.log(err)
})

/* the function for connecting to the port */
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

app.use('/api',route)