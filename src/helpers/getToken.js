"use client";

import { randomsLetters } from "@/utils/randoms-letters";

export async function getToken(email, password) {
  try {
    if (localStorage.getItem("token") && localStorage.getItem("tokenExpires")) {
      const currentDate = Date.now();
      const token = localStorage.getItem("token");
      const tokenExpires = localStorage.getItem("tokenExpires");
      const indexRandomLetters = token.indexOf(token.slice(-27))
      const newToken = token.slice(6, indexRandomLetters)
      const desconvertedToken = newToken.replace("n", "|")

      if (currentDate < tokenExpires) {
        
        return { token: desconvertedToken, tokenExpires };
      }
    }

    const res = await fetch(`${process.env.ENDPOINT_API}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
        `Error getToken !res.ok: ${res.status}. ${res.statusText}`
      );
    }

    const data = await res.json();
    const { token } = data;
    const tokenExpires = new Date(data.expired_at).getTime();
    const randomNumber = Math.floor(100000 + Math.random() * 900000);
    const newToken = randomNumber + token + randomsLetters(27)
    const convertedToken = newToken.replace("|", "n")
    localStorage.setItem("token", convertedToken);
    localStorage.setItem("tokenExpires", tokenExpires);
    return { token, tokenExpires };
  } catch (error) {
    throw new Error(`Error catch getToken: ${error}`);
  }
}
