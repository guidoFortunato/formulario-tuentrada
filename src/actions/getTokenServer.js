"use server"

import { encryptToken } from "@/actions/encryptToken";

export async function getTokenServer() {
  const email = "gfortunato@tuentrada.com"
  const password = "Olvido!2024"
  try {
    const res = await fetch(`https://testapi.tuentrada.com/api/login`, {
      // next: { revalidate: 60 },
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
      console.log({res})
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
  const email = "gfortunato@tuentrada.com"
  const password = "Olvido!2024"
  try {
    const res = await fetch(`https://testapi.tuentrada.com/api/login`, {
      // next: { revalidate: 60 },
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
      console.log({res})
      throw new Error(
        `Error getTokenServer !res.ok: ${res.status}. ${res.statusText}`
      );
    }

    const { token, expired_at } = await res.json();

    // Encriptar el token 
    // const encryptedToken = await encryptToken(token);

    const tokenExpires = Math.floor(new Date(expired_at).getTime() / 100000)
    

    return { token, tokenExpires };
    
  } catch (error) {
    throw new Error(`Error catch getTokenServer: ${error}`);
  }
}

