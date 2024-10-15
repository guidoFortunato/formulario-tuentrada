import { createClient } from "redis";

let redisClient;

const getRedisClient = async () => {
  if (!redisClient) {
    console.log('se crea la conexion a redis por primera vez')
    redisClient = createClient({
      socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
      },
    });

    redisClient.on("error", (err) => console.log("Redis Client Error", err));

    await redisClient.connect();
  }

  return redisClient;
};

export default getRedisClient;
