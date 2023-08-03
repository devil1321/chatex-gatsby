const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt');
const saltRounds = 12
const jwt = require('jsonwebtoken');
const jwtSecret = 'jwtsecret'

const redisClient = require('../controllers/db')

router.post('/register',(req,res)=>{
    const { email, password_1,password_2, username } = req.body
    bcrypt.genSalt(saltRounds, function(err, salt) {
      if(password_1.trim() === password_2.trim()){
        bcrypt.hash(password_1.trim(), salt, function(err, hash) {
                redisClient.get(`user:${email}`,(err,data)=>{
                if (err) {
                    console.error("Error retrieving JSON data from Redis:", err);
                    res.json({"err":'DB Error (Wrong User)'})
                  } else {
                    const parsedData = JSON.parse(data);
                    if(parsedData?.email === 'email'){
                        res.json({"err":'User Exists Choose Diffrent Email'})
                    }else{
                        redisClient.set(`user:${email}`, JSON.stringify({
                            username:username,
                            email:email,
                            password:hash,
                            isOnline:true,
                            phone:null,
                            aboutMe:'',
                            contacts:[]
                        }), (err, reply) => {
                            if (err) {
                              console.error("Error storing JSON data in Redis:", err);
                            } else {
                              const user = {
                                username:username,
                                email:email,
                                password:hash,
                                isOnline:true,
                                aboutMe:'',
                                contacts:[],
                              }
                              if (user) {
                                // Generate JWT and send it back to the client
                                const token = jwt.sign({ id: user.email, name:user.email ,email:user.email}, jwtSecret);
                                res.json({ access_token:token });
                                done(null, user);
                              } else {
                                res.status(401).json({ error: 'Invalid password' });
                              }
                            }
                          });
                        }
                    }
            })
        });
      }else{
        res.json({'msg':"password not match user not registered"})
      }
    });
})


router.post('/login', (req, res) => {
  const { email, password } = req.body;
  // Listen for the 'ready' event to ensure the Redis client is ready
    redisClient.get(`user:${email}`, (err, data) => {
      if (err) {
        console.error("Error retrieving JSON data from Redis:", err);
        res.status(500).json({ "err": 'DB Error (Wrong User)' });
      } else {
        const userData = JSON.parse(data);
        if (!userData) {
          // User not found in Redis, handle the case accordingly
          res.status(404).json({ "err": 'User not found' });
        } else {
          bcrypt.compare(password.trim(), userData.password, function (err, result) {
            if (result) {
              const token = jwt.sign({ id: userData.email, name:userData.email ,email:userData.email}, jwtSecret);
              res.json({ access_token:token,user:userData });
            } else {
              res.json({access_token:null,user:null})
            }
          });
        }
      }
  });
});

router.get('/logout', (req, res) => {
    req.user = null
    req.access_token = null
    req.logout((err)=>console.log(err));
    res.json({user:null,access_token:null})
})

module.exports = router;
