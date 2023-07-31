const redisClient = require('./db')

module.exports = function(req,res,data){
    redisClient.set(`user:${res.session.user.email}`, JSON.stringify(data), (err, reply) => {
        if (err) {
            console.error("Error updating JSON data in Redis:", err);
          } else {
            res.json({msg:"JSON data updated in Redis"});
          }
    })
}