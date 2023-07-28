const express = require('express')
const router = express.Router()
const updateUser = require('../controllers/update-user')
const bcrypt = require('bcrypt');
const saltRounds = 12

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

module.exports = router