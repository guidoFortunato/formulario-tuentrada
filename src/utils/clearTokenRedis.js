const { getRedisClient } = require("../lib/redis");


async function deleteToken() {
  const client = await getRedisClient();

  try {
    // Elimina el token 'at-authjs-token'
    await client.del('at-authjs-token');
    console.log('Token "at-authjs-token" destruido en Redis.');
  } catch (err) {
    console.error('Error eliminando el token:', err);
  } finally {
    client.quit(); // Asegúrate de cerrar la conexión con Redis
  }
}

deleteToken();
