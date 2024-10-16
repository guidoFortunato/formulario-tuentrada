import { getTokenServerNoEnc } from "@/actions/getTokenServer";
import { getDataCache } from "@/helpers/getInfoTest";
import { getTokenRedis, saveTokenRedis } from "@/services/redisService";

export const getData = async (url, timeRevalidate = 60) => {
  // Obtener el token desde Redis
  let token = await getTokenRedis();

  // Si no existe el token en Redis, obtenerlo desde el servidor y guardarlo
  if (!token) {
    const { token: tokenServer, tokenExpires } = await getTokenServerNoEnc();
    token = tokenServer;
    await saveTokenRedis("at-authjs-token", tokenServer, tokenExpires);
  }

  // Hacer la solicitud a la API con el token
  const res = await getDataCache(url, token, timeRevalidate);
  // console.log({res})

  // Verificar si la respuesta es válida
  if (!res.status) {
    return {
      status: false,
      message: res.message ?? "Error de autenticación"
    };
  }

  return { status: true, res, token };
};
