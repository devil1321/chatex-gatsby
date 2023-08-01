module.exports = function(req,res,next){
    if(req.session.user || req.user){
        if(req.user){
            req.session.user = req.user
        }
        next()
    }else{
        res.json({user:null})
    }
}