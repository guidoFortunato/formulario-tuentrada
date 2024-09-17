import { createClient } from 'redis';

let redisClient;

export const getRedisClient = async () => {
  if (!redisClient) {
    redisClient = createClient({
      socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
      },
    });

    redisClient.on('error', (err) => console.log('Redis Client Error', err));

    await redisClient.connect();
  }
  
  return redisClient;
};
