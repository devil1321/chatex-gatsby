const jwt = require('jsonwebtoken');
const jwtSecret = 'jwtsecret'
const redisClient = require('../controllers/db')
module.exports = authenticateJWT = (req, res, next) => {
    let token
    if(req?.user?.token){
        token = req.user.token
        console.log(token)
    }else{
        if(token?.length > 0){
            token = req.header('Authorization');
            console.log(token)
            token = token.slice(7);
        }
    }
    jwt.verify(token, jwtSecret, (err, user) => {
      if (err) {
        res.json(err)
      }else{ // Forbidden
          redisClient.get(`user:${user.email}`, (err, data) => {
              if (err) {
                  console.error("Error retrieving JSON data from Redis:", err);
                  res.status(500).json({ "err": 'DB Error (Wrong User)' });
                } else {
                    const userData = JSON.parse(data);
                    userData.token = token
                    req.user = userData;
                    next();
                }
            })
            }
        });
};