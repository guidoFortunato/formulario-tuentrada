const { createClient } = require("redis");
require('dotenv').config();

const getTokenServerNoEnc = async() => {
  const email = process.env.CREDENTIAL_EMAIL;
  const password = process.env.CREDENTIAL_PASSWORD;

  try {
    const res = await fetch(`https://${process.env.ENDPOINT_API}/api/login`, {
      cache: "no-store",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    // console.log({res})

    if (!res.ok) {
      console.log({ res });
      throw new Error(
        `Error getTokenServer !res.ok: ${res.status}. ${res.statusText}`
      );
    }

    const { token, expired_at } = await res.json();
    
    // Paso 1: Obtener la fecha y hora actual
    const now = new Date();

    // Paso 2: Crear una fecha con el valor de 'expired_at'
    const expiredAt = new Date(expired_at);

    // Paso 3: Calcular la diferencia en segundos
    const tokenExpires = Math.floor((expiredAt - now) / 1000);

    return { token, tokenExpires };
    
  } catch (error) {
    throw new Error(`Error catch getTokenServer: ${error}`);
  }
}



const redisConection = async () => {
  let redisClient;
    redisClient = createClient({
      socket: {
        host: process.env.REDIS_HOST, 
        port: process.env.REDIS_PORT,
      },
    });

    redisClient.on("error", (err) => console.log("Redis Client Error", err));

    await redisClient.connect();

  return redisClient;
};


async function deleteAndCreateNewToken() {
  const client = await redisConection();
  const { token, tokenExpires } = await getTokenServerNoEnc();

  try {

    // Elimina el token 'at-authjs-token'
    await client.del('at-authjs-token');
    console.log('Token "at-authjs-token" destruido en Redis.');

    //Guardo un nuevo token en redis
    await client.set("at-authjs-token", token, {
      EX: tokenExpires, // Tiempo de expiración en segundos
    });
    console.log('Nuevo token "at-authjs-token" creado');

  } catch (err) {
    console.error('Error:', err);
  } finally {
    client.quit(); // Asegúrate de cerrar la conexión con Redis
  }
}

deleteAndCreateNewToken();





// const { getRedisClient } = require("../lib/redis");


// async function deleteToken() {
//   const client = await getRedisClient();

//   try {
//     // Elimina el token 'at-authjs-token'
//     await client.del('at-authjs-token');
//     console.log('Token "at-authjs-token" destruido en Redis.');
//   } catch (err) {
//     console.error('Error eliminando el token:', err);
//   } finally {
//     client.quit(); // Asegúrate de cerrar la conexión con Redis
//   }
// }

// deleteToken();
