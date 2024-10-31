const { createClient } = require("redis");
require("dotenv").config();

const redisConection = async () => {
  let redisClient;

  const redisOptions = {
    socket: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    },
  };

  if (process.env.REDIS_PASSWORD !== "null") {
    redisOptions.password = process.env.REDIS_PASSWORD;
  }


   
  redisClient = createClient(redisOptions)

  redisClient.on("error", (err) => console.log("Redis Client Error", err));

  await redisClient.connect();

  return redisClient;
};

async function deleteToken() {
  const client = await redisConection();

  try {
    // Elimina el token 'at-authjs-token' si existe
    const token = await client.get("at-authjs-token");
    if (!token) return

    await client.del("at-authjs-token");
    console.log('Token "at-authjs-token" destruido en Redis.');
  } catch (err) {
    console.error("Error:", err);
  } finally {
    client.quit(); // Asegúrate de cerrar la conexión con Redis
  }
}

deleteToken();
