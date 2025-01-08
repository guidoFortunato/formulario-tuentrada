import { getTokenServerNoEnc } from "@/actions/getTokenServer";
import { getDataCache, getDataTickets, sendDataEmail } from "@/helpers/getInfoTest";
import { getTokenRedis, saveTokenRedis } from "@/services/redisService";

export const getData = async (url, timeRevalidate = 60) => {
  // Obtener el token desde Redis
  let token = await getTokenRedis();
  // console.log({getTokenRedis: token})

  // Si no existe el token en Redis, obtenerlo desde el servidor y guardarlo
  if (!token) {
    const { token: tokenServer, tokenExpires } = await getTokenServerNoEnc();
    token = tokenServer;
    await saveTokenRedis("at-authjs-token", tokenServer, tokenExpires);
  }
  // console.log({token})

  // Hacer la solicitud a la API con el token
  // const res = await getDataCache(url, token, timeRevalidate);
  const res = await getDataCache(url, token, timeRevalidate);
  // console.log({res})

  // Verificar si la respuesta es válida
  if (!res.status) {
    // console.error({res})
    return {
      status: false,
      message: res.message ?? "Error de autenticación"
    };
  }

  return { status: true, res, token };
};

export const sendData = async (url, email, timeRevalidate = 0) => {
  console.log('entra a sendData')
  // Obtener el token desde Redis
  let token = await getTokenRedis();
  // console.log({getTokenRedis: token})

  // Si no existe el token en Redis, obtenerlo desde el servidor y guardarlo
  if (!token) {
    const { token: tokenServer, tokenExpires } = await getTokenServerNoEnc();
    token = tokenServer;
    await saveTokenRedis("at-authjs-token", tokenServer, tokenExpires);
  }
  // console.log({token})

  // Hacer la solicitud a la API con el token
  // const res = await getDataCache(url, token, timeRevalidate);
  const res = await sendDataEmail(url, token, email, timeRevalidate);
  // console.log({res})

  // Verificar si la respuesta es válida
  if (!res.status) {
    // console.error({res})
    return {
      status: false,
      message: res.message ?? "Error de autenticación"
    };
  }

  return { status: true, res };
};

export const getTickets = async (url, email, itilcategoriesId) => {
  console.log('entra a getTickets')
  // Obtener el token desde Redis
  let token = await getTokenRedis();
  // console.log({getTokenRedis: token})

  // Si no existe el token en Redis, obtenerlo desde el servidor y guardarlo
  if (!token) {
    const { token: tokenServer, tokenExpires } = await getTokenServerNoEnc();
    token = tokenServer;
    await saveTokenRedis("at-authjs-token", tokenServer, tokenExpires);
  }
  // console.log({token})

  // Hacer la solicitud a la API con el token
  // const res = await getDataCache(url, token, timeRevalidate);
  const res = await getDataTickets(url, token, email, itilcategoriesId);
  // console.log({res})

  // Verificar si la respuesta es válida
  if (!res.status) {
    // console.error({res})
    return {
      status: false,
      message: res.message ?? "Error de autenticación"
    };
  }

  return { status: true, res };
};
