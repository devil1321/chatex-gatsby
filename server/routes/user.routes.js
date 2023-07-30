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
                    email:req.session.user.email,
                    username:req.session.user.username,
                    password:hash,
                    phone:req.session.user.phone,
                    aboutMe:req.session.user.aboutMe,
                }
                updateUser(req,res,user)
                res.json({'msg':"User Updated"})
            })
        })
    }else{
        const user = {
            username, 
            email, 
            password, 
            phone, 
            aboutMe 
        }
        updateUser(req,res,user)
        res.json({'msg':"User Updated"})
    }
})

router.post('/add-contact',(req,res)=>{
    const { user, contact } = req.body
    let tmpUser = user
    let tmpContacts = [...user.contacts]
    tmpContacts.push(contact)
    tmpUser.contacts = tmpContacts
    updateUser(req,res,tmpUser)
})

module.exports = router