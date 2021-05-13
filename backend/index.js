require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes/routes')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use('/api', routes)

const DB_URI = ******
//Database
mongoose.connect(DB_URI, {
     useNewUrlParser: true,
     useUnifiedTopology: true,
     useFindAndModify: false,
}).then(() => {
     console.log(`Server is running on port: ${PORT}`)
     app.listen(PORT)
})
