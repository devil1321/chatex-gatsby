const express = require('express')
const router = express.Router()
const updateUser = require('../controllers/update-user')
const redisClient = require('../controllers/db')
const bcrypt = require('bcrypt');
const saltRounds = 12


router.get('/users',async(req,res)=>{
    const allKeys = await redisClient.keys("*");
    const regex = /user:/gi
    const users = allKeys.filter(k =>regex.test(k))
    if(users.length > 0){
        const allValues = await redisClient.mget(...users);
        let vals = []
        allValues.forEach(v =>{
            vals.push(JSON.parse(v))
        })
        res.json([...vals])
    }else{
        res.json({msg:'No registered users in db'})
    }
})

router.get('/user',async(req,res)=>{
    const { email } = req.body
    redisClient.get(`user:${email}`,(err,data)=>{
        if(err){
            res.json({...data})
        }else{
            res.json({
                msg:'User Not Found'
            })
        }
    })
})

router.post('/update',(req,res)=>{
    const { username, email, password, phone, aboutMe } = req.body
    if(password !== req.session.user.password){
        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(password, salt, function(err, hash) {
                const user = {
                    email:req.user.email,
                    username:req.user.username,
                    password:hash,
                    phone:req.user.phone,
                    aboutMe:req.user.aboutMe,
                    isOnline:true
                }
                updateUser(req,res,user)
                res.json({user})
            })
        })
    }else{
        const user = {
            username, 
            email, 
            password, 
            phone, 
            aboutMe, 
            isOnline:true,
        }
        updateUser(req,res,user)
        res.json({user})
    }
})

router.post('/add-contact',(req,res)=>{
    const { user, contact } = req.body
    let tmpUser = {...user }
    let tmpContacts = [...user.contacts]
    const isObjectInArray = tmpContacts.some((item) => item.email === contact.email);
    if(!isObjectInArray){
        tmpContacts.push(contact)
    }
    tmpUser.contacts = tmpContacts
    updateUser(req,res,tmpUser)
})

module.exports = router