require('dotenv').config({path:__dirname+'/../.env'})
const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env
const express = require('express')
const session = require('express-session')
const massive = require('massive')
const app = express()
const authCtrl = require('./controllers/authController')
const mainCtrl = require('./controllers/mainController')

app.use(express.json())
app.use(session({
    resave: false, 
    saveUninitialized: false, 
    secret: SESSION_SECRET, 
    cookie: {
        maxAge: 1000 * 60 * 60
        /*One hour*/
    }
}))

massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    console.log("db connected")
})

app.post('/api/createaccount', authCtrl.createAccount)
app.post('/api/login', authCtrl.login)
app.post('/api/logout', authCtrl.logout)
app.delete('/api/:username/delete', authCtrl.deleteAccount)

app.get('/api/currentpage/:username', mainCtrl.getCurrentPage)
app.get('/api/:personid/:pageid/posts', mainCtrl.getPostsOnCurrentPage)
app.put('/api/posts/:postid', mainCtrl.editIndividualPost)
app.put('/api/userinfo/:username', mainCtrl.updateUserInfo)
app.post('/api/:personid/:pageid/posts', mainCtrl.createNewPost)
app.delete('/api/:pageid/:postid', mainCtrl.deleteIndividualPost)

app.listen(SERVER_PORT, () => {
    console.log(`Listening on Port ${SERVER_PORT}`)
})