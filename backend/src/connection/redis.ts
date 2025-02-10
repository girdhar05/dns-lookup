import Redis from 'ioredis';

let redisClient: Redis;

if (process.env.NODE_ENV === 'test') {
  // Use mock in test mode
  console.log('Using ioredis-mock');
  const RedisMock = require('ioredis-mock');
  redisClient = new RedisMock();
} else {
  console.log('Using ioredis');
  redisClient = new Redis({
    host: process.env.REDIS_HOST || 'localhost',
    port: 6379,
  });
}

export default redisClient;