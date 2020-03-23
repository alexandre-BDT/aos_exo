const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const PORT = 4242
const dbURI = require('./config/keys').MongoURI
const auth = require('./routes/index')

app.use(cors())

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err)) 

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error'));
app.use('/auth', auth)
app.listen(PORT, console.log(`Server started on port ${PORT}`))