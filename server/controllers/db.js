const Redis = require("ioredis");


const redisClient = new Redis({
    port: 18454,
    host: 'redis-16421.c274.us-east-1-3.ec2.cloud.redislabs.com:16421',
    username:'admin',
    password: 'Admin267#$',
    db: 0, // Defaults to 0
});
redisClient.on("ready", () => {
    console.log("Redis client connected and ready to accept commands");
  });
  
redisClient.on("error", (err) => {
  console.error("Error connecting to Redis:", err);
});

module.exports = redisClient
