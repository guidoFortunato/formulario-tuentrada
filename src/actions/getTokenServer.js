"use server";

import { encryptToken } from "@/actions/encryptToken";

export async function getTokenServer() {
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

    // Encriptar el token
    const encryptedToken = await encryptToken(token);

    const tokenExpires = new Date(expired_at).getTime();

    return { token: encryptedToken, tokenExpires };
  } catch (error) {
    throw new Error(`Error catch getTokenServer: ${error}`);
  }
}

export async function getTokenServerNoEnc() {
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
