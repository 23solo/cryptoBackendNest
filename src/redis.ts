import { Redis } from 'ioredis';

const redis = new Redis({
  host: 'host.com',
  port: 6379,
  // If your Redis instance requires authentication, add the password here
  // password: 'your_redis_password',
});

export default redis;
