// utils/fetchWithToken.js


import { getTokenServerNoEnc } from "@/actions/getTokenServer";
import { getDataCache } from "@/helpers/getInfoTest";
import { getTokenRedis, saveTokenRedis } from "@/services/redisService";
import { notFound } from "next/navigation";

export const getData = async (url) => {
  // Obtener el token desde Redis
  let token = await getTokenRedis();

  // Si no existe el token en Redis, obtenerlo desde el servidor y guardarlo
  if (!token) {
    const { token: tokenServer } = await getTokenServerNoEnc();
    token = tokenServer;
    await saveTokenRedis("authjs-token-tuen", tokenServer, "604800");
  }

  // Hacer la solicitud a la API con el token
  const res = await getDataCache(url, token);

  // Verificar si la respuesta es válida
  if (!res.status) {
    notFound(); // Redirige a una página 404 si no se encuentra la información
  }

  return { res, token }; // Retornar los datos que necesitas
};
