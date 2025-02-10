import ioredis from 'ioredis';

if (process.env.NODE_ENV === 'test') {
  // Use mock in test mode
  console.log('Using ioredis-mock');
  module.exports = new (require('ioredis-mock'))();
} else {
  console.log('Using ioredis');
  module.exports = new ioredis({ host: process.env.REDIS_HOST || "localhost", port: 6379 });
}