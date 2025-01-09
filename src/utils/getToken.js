import { getTokenServerNoEnc } from "@/actions/getTokenServer";
import { getTokenRedis, saveTokenRedis } from "@/services/redisService";

export const getToken = async () => {
  let token = await getTokenRedis();

  // Si no existe el token en Redis, obtenerlo desde el servidor y guardarlo
  if (!token) {
    const { token: tokenServer, tokenExpires } = await getTokenServerNoEnc();
    token = tokenServer;
    await saveTokenRedis("at-authjs-token", tokenServer, tokenExpires);
  }

  return token;
};
