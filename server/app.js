const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const cors = require('cors')
const app = express()
const cookieParser = require('cookie-parser')
const authenticateJWT = require('./controllers/isAuth')

const AuthRoutes = require('./routes/auth.routes')
const ChatRoutes = require('./routes/chat.routes')
const UserRoutes = require('./routes/user.routes')

require('dotenv').config()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(cookieParser())


app.use(cors({
  origin:['https://chatex-worldwide.netlify.app','http://localhost:8000','64ca56b381e0030008feaeeb--chatex-worldwide.netlify.app'],
  credentials: true, 
}))

app.use(session({ 
    secret: 'chatex-zaq12wsx',
    resave: false,
    saveUninitialized: false,
}))

app.use('/auth',AuthRoutes)
app.use((req,res,next)=>authenticateJWT(req,res,next))

app.use('/chat',ChatRoutes)
app.use('/user',UserRoutes)

app.get('/is-authenticated',(req,res)=>{
  console.log(req.user)
  if(req.user){
    res.json({...req.user})
  }else{
    res.json({user:null,access_token:null})
  }
})



app.listen(process.env.PORT, () => {
  console.log('Server started ' + process.env.PORT);
});

