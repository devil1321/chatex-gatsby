const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const cors = require('cors')
const app = express()
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken');
const jwtSecret = 'jwtsecret'
const authenticateJWT = require('./controllers/isAuth')

const GoogleStrategy = require("passport-google-oauth20").Strategy;

const passport = require("passport");

const AuthRoutes = require('./routes/auth.routes')
const PassportRoutes = require('./routes/passport.routes')
const ChatRoutes = require('./routes/chat.routes')
const UserRoutes = require('./routes/user.routes')

const redisClient = require('./controllers/db')

require('dotenv').config()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(cookieParser())


app.use(cors({
  origin:['https://chatex-worldwide.netlify.app','http://localhost:8000','64ca56b381e0030008feaeeb--chatex-worldwide.netlify.app'],
  credentials: true, 
}))

app.use(session({ secret: 'chatex-zaq12wsx' }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy({
    clientID: "869326613213-7dgjuusmng1u7of2ppmmbo25pq8jlefq.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "https://chatex-14m2.onrender.com/auth/google/callback", // The URL to handle the Google's response
  },
  (accessToken, refreshToken, profile, done) => {
    // The profile object contains user information received from Google
    // You can save this information in your database or use it as needed
    let user
    redisClient.get(`user:${profile._json.email}`,((err,data)=>{
        user = JSON.stringify(data)
    }))
    if(user){
        // Generate JWT and send it back to the client
        const token = jwt.sign({ id: user.email, name:user.email ,email:user.email}, jwtSecret);
        user.token = token
        req.user = user
        return done(null,user);
     
    }else{
        redisClient.set(`user:${profile._json.email}`,JSON.stringify({
            username:null,
            email:profile._json.email,
            phone:null,
            aboutMe:'',
            isOnline:true,
            contacts:[]
        }), (err, reply) => {
            if(err){
                console.log(err)
            }else{
                user = {
                    username:null,
                    email:profile._json.email,
                    phone:null,
                    aboutMe:'',
                    isOnline:true,
                    contacts:[]
                }
                if (user) {
                  // Generate JWT and send it back to the client
                  const token = jwt.sign({ id:user.email, name:user.email ,email: user.email }, jwtSecret);
                  user.token = token
                  req.user = user
                  return done(null,user);
                } else {
                  res.status(401).json({ error: 'Invalid password' });
                }
            }
        })
    }
  }));

  passport.serializeUser((user, done) => {
    // Use user ID as the key to identify the user in the session
    done(null, user);
  });
  
  passport.deserializeUser((user, done) => {
    // Fetch user from database or any data store based on the user ID
    redisClient.get(`user:${user.email}`,((err,data)=>{
        if(err){
            return done(err)
        }else{
            const userObj = JSON.parse(data)
            userObj.token = user.token
            done(null,{...userObj});
        }
    }))
  });



app.use('/auth',AuthRoutes)
app.use('/auth',PassportRoutes)

app.use((req,res,next)=>authenticateJWT(req,res,next))

app.use('/chat',ChatRoutes)
app.use('/user',UserRoutes)

app.get('/is-authenticated',(req,res)=>{
  if(req.user){
    res.json({...req.user})
  }else{
    res.json({user:null,access_token:null})
  }
})



app.listen(process.env.PORT, () => {
  console.log('Server started ' + process.env.PORT);
});

