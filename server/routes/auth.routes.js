const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt');
const saltRounds = 12


const redisClient = require('../controllers/db')

router.post('/register',(req,res)=>{
    const { email, password, username } = req.body
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
                redisClient.get(`${email}:user`,(err,data)=>{
                if (err) {
                    console.error("Error retrieving JSON data from Redis:", err);
                    res.json({"err":'DB Error (Wrong User)'})
                  } else {
                    const parsedData = JSON.parse(data);
                    if(data?.email === 'email'){
                        res.json({"err":'User Exists Choose Diffrent Email'})
                    }else{
                        redisClient.set(`user:${email}`, JSON.stringify({
                            username:username,
                            email:email,
                            password:hash,
                            isOnline:true,
                            phone:null,
                            aboutMe:null,
                            contacts:[]
                        }), (err, reply) => {
                            if (err) {
                              console.error("Error storing JSON data in Redis:", err);
                            } else {
                              res.json('You`re registered now')
                              req.session.user = {
                                username:username,
                                email:email,
                                password:hash,
                                isOnline:true,
                                contacts:[]
                              }
                            }
                          });
                        }
                    }
            })
        });
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
          bcrypt.compare(password, userData.password, function (err, result) {
            if (result) {
              req.session.user = userData;
              res.json({ "msg": "Login successful" });
            } else {
              res.json({ 'msg': 'Wrong Credentials' });
            }
          });
        }
      }
  });
});

router.post('/logout', (req, res) => {
    if(req.user || req.session.user){
        req.session.user = null
        res.json({user:null})
    }
})

module.exports = router;
