const jwt = require('jsonwebtoken');
const jwtSecret = 'jwtsecret'
const redisClient = require('../controllers/db')
module.exports = authenticateJWT = (req, res, next) => {
    let token
    console.log(req.user)
    if(req?.user?.token){
        token = req.user.token
    }else{
        token = req.header('Authorization');
        if(token?.length > 0){
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