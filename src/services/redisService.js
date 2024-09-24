"use server";

import { getRedisClient } from "@/lib/redis";

// Función para guardar el token en Redis
export const saveTokenRedis = async (key, token, expirationInSeconds) => {
  const client = await getRedisClient();
  try {
    await client.set(key, token, {
      EX: expirationInSeconds, // Tiempo de expiración en segundos
    });
  } catch (error) {
    console.error("Error al guardar el token en Redis:", error);
  }
};

// Función para obtener un token de Redis
export const getTokenRedis = async () => {
  const client = await getRedisClient();
  try {
    const token = await client.get("authjs-token-tuen");
    return token;
  } catch (error) {
    console.error("Error al obtener el token de Redis:", error);
    return null;
  }
};
