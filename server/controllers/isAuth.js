const jwt = require('jsonwebtoken');
const jwtSecret = 'jwtsecret'
const redisClient = require('../controllers/db')
module.exports = authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.sendStatus(401); // Unauthorized
    const extractedToken = token.slice(7);
    jwt.verify(extractedToken, jwtSecret, (err, user) => {
      if (err) {
        res.json(err)
      } // Forbidden
      if(user){
          redisClient.get(`user:${user.email}`, (err, data) => {
              if (err) {
                  console.error("Error retrieving JSON data from Redis:", err);
                  res.status(500).json({ "err": 'DB Error (Wrong User)' });
                } else {
                    const userData = JSON.parse(data);
                    req.user = userData;
                    next();
                }
            })
        }else{
            next()
        }
   });
};