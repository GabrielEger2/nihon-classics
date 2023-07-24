const express = require('express');
const cors = require ('cors');
const colors = require('colors');
const connectDB = require('./config/db')
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');

const port = process.env.PORT || 5000

connectDB()

const app = express()

app.use(cors());

app.use(express.json())
app.use(express.urlencoded({ extended : false}))

app.use('/api/posts', require('./routes/postsRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

app.use(errorHandler)

app.listen(port, () => console.log(`server started on port ${port}`))