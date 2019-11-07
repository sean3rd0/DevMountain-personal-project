require('dotenv').config({path:__dirname+'/../.env'})
const {SERVER_PORT, CONNECTION_STRING} = process.env
const express = require('express')
const massive = require('massive')
const app = express()
const authCtrl = require('./controllers/authController')
const mainCtrl = require('./controllers/mainController')

app.use(express.json())

massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    console.log("db connected")
})



app.listen(SERVER_PORT, () => {
    console.log(`Listening on Port ${SERVER_PORT}`)
})