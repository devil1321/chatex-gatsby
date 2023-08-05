const express = require('express')
const router = express.Router()
const redisClient = require('../controllers/db')

router.get('/rooms',async(req,res)=>{
    const allKeys = await redisClient.keys("*");
    const regex = /room:/gi
    const rooms = allKeys.filter(k =>regex.test(k)).map(k => k.slice(5,k.length))
    res.json({rooms})
})
router.post('/last-rooms',async(req,res)=>{
    const { user } = req.body
    const allKeys = await redisClient.keys("*");
    const regex = /room:/gi
    const rooms = allKeys.filter(k =>regex.test(k)).map(k => k.slice(5,k.length))
    let roomObjects = []
    rooms.forEach(r =>{
        redisClient.get(`room:${r}`,(err,data)=>{
            if(err){
                console.log(err)
            }else{
                const parsed = JSON.parse(data)
                roomObjects.push({...parsed})
            }
        })
    })
    setTimeout(() => {
        
        const sorted = roomObjects.sort((a,b) =>{
            a?.message?.date - b?.message?.date
        })
        const response = sorted.filter(r => {
            const filtered = r.messages?.filter(m => m?.user === user?.email)
            if(filtered?.length > 0){
                return r
            }
        }).slice(0,3)
        res.json([...response])
    }, 1000);
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
    const { room,date } = req.body
    redisClient.get(`room:${room}`,(err,data)=>{
        if(err){
            res.json({
                room:room,
                date:date,
                messages:[]
            })
        }else{
            const parsed = JSON.parse(data)
            res.json({
                room:room,
                date:date,
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
    redisClient.get(`${reciver}:${sender}`,(err,data)=>{
        if(err){
            res.json({'msg':'Cannot Get Private Messages'})
        }else{
            const messages = JSON.parse(data)
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
            redisClient.set(`${reciver.email}:${sender}`, JSON.stringify(messages), (err, reply) => {
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