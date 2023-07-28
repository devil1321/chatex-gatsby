const express = require('express')
const router = express.Router()
const redisClient = require('../controllers/db')

router.get('/rooms',async(req,res)=>{
    const allKeys = await redisClient.keys("*");
    console.log(allKeys)
    const regex = /room:/gi
    const rooms = allKeys.filter(k =>regex.test(k))
    res.json({rooms})
})

router.post('/create-room',(req,res)=>{
    const { room } = req.body
    redisClient.set(`room:${room}`, JSON.stringify([]), (err, reply) => {
        if (err) {
          console.error("Error storing JSON data in Redis:", err);
        } else {
          res.json({'msg':'Room Created'})
        }
      });
})

router.get('/get-messages',(req,res)=>{
    const { room } = req.body
    redisClient.get(`room:${room}`,(err,data)=>{
        if(err){
            res.json({'msg':'Cannot Get Messages'})
        }else{
            const messages = JSON.parse(data)
            res.json({
                room:room,
                messages:messages
            })
        }
    })
})

router.post('/message',(req,res)=>{
    const { room , message } = req.
    redisClient.get(`room:${room}`,(err,data)=>{
        if(err){
            res.json({'msg':'Cannot Send Message'})
        }else{
            const messages = JSON.parse(data)
            messages.push(message)
            redisClient.set(`${room}`, JSON.stringify(messages), (err, reply) => {
                if (err) {
                  console.error("Error storing JSON data in Redis:", err);
                } else {
                  res.json({'msg':'Message Sended'})
                }
              });
        }
    })
   
})
router.get('/private-messages',(req,res)=>{
    const { reciver,sender } = req.body
    redisClient.get(`${sender}:${reciver}`,(err,data)=>{
        if(err){
            res.json({'msg':'Cannot Get Private Messages'})
        }else{
            const messages = JSON.parse(data)
            res.json({
                reciver,
                sender,
                messages:messages
            })
        }
    })
})
router.post('/private-message',(req,res)=>{
    const { reciver,sender,message } = req.body
    redisClient.get(`${reciver}:${sender}`,(err,data)=>{
        if(err){
            res.json({'msg':'Cannot Send Message'})
        }else{
            const messages = JSON.parse(data)
            messages.push(message)
            redisClient.set(`${reciver}:${sender}`, JSON.stringify(messages), (err, reply) => {
                if (err) {
                  console.error("Error storing JSON data in Redis:", err);
                } else {
                  res.json({'msg':'Message Sended'})
                }
              });
        }
    })
})

module.exports = router