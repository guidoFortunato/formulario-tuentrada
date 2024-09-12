"use server"

import { encryptToken } from "@/helpers/encryptToken";

export async function getTokenServer() {
  const email = process.env.NEXT_PUBLIC_EMAIL
  const password = process.env.NEXT_PUBLIC_PASSWORD
  try {
    const res = await fetch(`https://${process.env.NEXT_PUBLIC_API}/api/login`, {
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
