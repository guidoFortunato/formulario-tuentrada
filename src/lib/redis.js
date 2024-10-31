import { createClient } from "redis";

const getRedisClient = async () => {
  if (!globalThis.redisClient) {
    console.log("se crea la conexion a redis por primera vez");

    const redisOptions = {
      socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
      },
    };

    if (process.env.REDIS_PASSWORD !== "null") {
      redisOptions.password = process.env.REDIS_PASSWORD;
    }

    globalThis.redisClient = createClient(redisOptions);

    globalThis.redisClient.on("error", (err) => {
      console.log("Redis Client Error", err);
      // Desconectar si hay un error
      globalThis.redisClient.disconnect();
      return
    });

    await globalThis.redisClient.connect();
  }

  return globalThis.redisClient;
};

export default getRedisClient;
