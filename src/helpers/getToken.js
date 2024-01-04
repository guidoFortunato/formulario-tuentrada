"use client";

import { randomsLetters } from "@/utils/randoms-letters";

// import { dataDecrypt } from "@/utils/data-decrypt";
// import { dataEncrypt } from "@/utils/data-encrypt";

export async function getToken( email = "gfortunato@tuentrada.com", password = "Correa.3030") {
  try {
    if (localStorage.getItem("token") && localStorage.getItem("tokenExpires")) {
      const currentDate = Date.now();
      const token = localStorage.getItem("token");
      const tokenExpires = localStorage.getItem("tokenExpires");
      const firstNumbers = token.slice(0,5)
      const indexRandomLetters = token.indexOf(token.slice(-27))
      const newToken = firstNumbers + token.slice(11, indexRandomLetters)
      const desconvertedToken = newToken.replace("n", "|")
      // console.log({desconvertedToken})

      if (currentDate < tokenExpires) {
        
        return { token: desconvertedToken, tokenExpires };
      }
    }

    const res = await fetch("https://api.tuentrada.com/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!res.ok) {
      throw new Error(
        `Error getToken !res.ok: ${res.status}. ${res.statusText}`
      );
    }

    //! encriptar el token

    const data = await res.json();
    const { token } = data;
    const tokenExpires = new Date(data.expired_at).getTime();
    const firstNumbers = token.slice(0,5)
    const randomNumber = Math.floor(100000 + Math.random() * 900000);
    const newNumbers = firstNumbers + randomNumber;
    const newToken = newNumbers + token.slice(5) + randomsLetters(27)
    const convertedToken = newToken.replace("|", "n")
    localStorage.setItem("token", convertedToken);
    localStorage.setItem("tokenExpires", tokenExpires);
    return { token, tokenExpires };
  } catch (error) {
    throw new Error(`Error catch getToken: ${error}`);
  }
}
