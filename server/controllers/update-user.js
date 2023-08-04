const redisClient = require('./db')

module.exports = function(req,res,data){
    redisClient.set(`user:${data.email}`, JSON.stringify(data), (err, reply) => {
        if (err) {
            console.error("Error updating JSON data in Redis:", err);
          } else {
            console.log('updated')
            res.json({msg:"JSON data updated in Redis"});
          }
    })
}