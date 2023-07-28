const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const app = express()

const passport = require("passport");
require('./controllers/passport/strategy')

const AuthRoutes = require('./routes/auth.routes')
const PassportRoutes = require('./routes/passport.routes')
const ChatRoutes = require('./routes/chat.routes')
const UserRoutes = require('./routes/user.routes')

const isAuth = require('./controllers/isAuth')
const redisClient = require('./controllers/db')

require('dotenv').config()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.use(session({
    secret:'chatex'
}))

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth',AuthRoutes)
app.use('/auth',PassportRoutes)

app.use((req,res,next) => isAuth(req,res,next))

app.get('/',(req,res)=>{
    res.json(req.user)
})

app.use('/chat',ChatRoutes)
app.use('/user',UserRoutes)

app.get('/clear-db',(req,res)=>{
    redisClient.flushdb((err, result) => {
        if (err) {
          console.error("Error clearing database:", err);
        } else {
          console.log("Database cleared:", result); // result will be "OK"
        }
    });
    res.send('DB Cleared')
})

app.listen(process.env.PORT, () => {
  console.log('Server started ' + process.env.PORT);
});

