require('dotenv').config();
const { Redis } = require('ioredis');

const redis = new Redis({
  port: process.env.REDISPORT,
  host: process.env.REDISHOST,
});

exports.redis = redis;
