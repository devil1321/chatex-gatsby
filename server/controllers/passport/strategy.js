const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const redisClient = require('../db')

passport.use(new GoogleStrategy({
    clientID: "869326613213-7dgjuusmng1u7of2ppmmbo25pq8jlefq.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "/auth/google/callback", // The URL to handle the Google's response
  },
  (accessToken, refreshToken, profile, done) => {
    // The profile object contains user information received from Google
    // You can save this information in your database or use it as needed
    let user
    redisClient.get(`user:${profile._json.email}`,((err,data)=>{
        user = JSON.stringify(data)
    }))
    if(user){
        return done(null, user);
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
                return done(null, user);
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
    done(null, user);
  });