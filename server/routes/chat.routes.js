const express = require('express')
const router = express.Router()
const redisClient = require('../controllers/db')

router.get('/rooms',async(req,res)=>{
    const allKeys = await redisClient.keys("*");
    const regex = /room:/gi
    const rooms = allKeys.filter(k =>regex.test(k)).map(k => k.slice(5,k.length))
    res.json({rooms})
})

router.post('/create-room',async(req,res)=>{
    const { room } = req.body
    const allKeys = await redisClient.keys("*");
    const regex = /room:/gi
    const isExists = allKeys.find(k =>regex.test(k))
    if(!isExists){
        redisClient.set(`room:${room}`, JSON.stringify({
            room,
            messages:[]
        }), (err, reply) => {
            if (err) {
                console.error("Error storing JSON data in Redis:", err);
            } else {
                res.json({'msg':'Room Created'})
            }
        });
    }else{
        res.json({"msg":"Room Exists"})
    }
})

router.post('/get-messages',(req,res)=>{
    const { room } = req.body
    redisClient.get(`room:${room}`,(err,data)=>{
        if(err){
            res.json({
                room:room,
                messages:[]
            })
        }else{
            const parsed = JSON.parse(data)
            res.json({
                room:room,
                messages:parsed
            })
        }
    })
})

router.post('/message',(req,res)=>{
    const { room , message, user } = req.body
    redisClient.get(`room:${room}`,(err,data)=>{
        if(err){
            res.json({'msg':'Cannot Send Message'})
        }else{
            let messages
            if(data !== null){
                messages = JSON.parse(data).messages
            }else{
                messages = []
            }
            messages.push({message,user})
            redisClient.set(`room:${room}`, JSON.stringify({
                room,
                messages
            }), (err, reply) => {
                if (err) {
                  console.error("Error storing JSON data in Redis:", err);
                } else {
                  res.json({
                    room,
                    messages:{
                        room,
                        messages
                    }
                  })
                }
              });
        }
    })
   
})
router.post('/private-messages',async(req,res)=>{
    const { reciver,sender,room } = req.body
    redisClient.get(`${sender}:${reciver}`,(err,data)=>{
        if(err){
            res.json({'msg':'Cannot Get Private Messages'})
        }else{
            const messages = JSON.parse(data)
            console.log(messages)
            res.json({
                reciver,
                sender,
                messages:{
                    room:room,
                    messages:messages
                }
            })
        }
    })
})
router.post('/private-message',(req,res)=>{
    const { reciver,sender,message } = req.body
    console.log(req.body)
    redisClient.get(`${reciver.email}:${sender}`,(err,data)=>{
        if(err){
            res.json({'msg':'Cannot Send Message'})
        }else{
            let messages = JSON.parse(data)
            if(messages !== null){
                messages.push(message)
            }else{
                messages = []
                messages.push(message)
            }
            redisClient.set(`${sender}:${reciver.email}`, JSON.stringify(messages), (err, reply) => {
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