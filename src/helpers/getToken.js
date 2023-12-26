"use client";

import { setCookie, getCookie, hasCookie } from "cookies-next";

export async function getToken( email = "gfortunato@tuentrada.com", password = "Correa.3030" ) {
  try {
    if (hasCookie("token") && hasCookie("tokenExpires")) {
      const token = getCookie("token");
      const tokenExpires = getCookie("tokenExpires");
      const currentDate = Date.now();

      if (currentDate < tokenExpires) {
        return { token, tokenExpires };
      }
    }

    if (localStorage.getItem("token") && localStorage.getItem("tokenExpires")) {
      const currentDate = Date.now();
      const token = localStorage.getItem("token")
      const tokenExpires = localStorage.getItem("tokenExpires")

      if (currentDate < tokenExpires) {
        return { token, tokenExpires };
      }
    }

    const res = await fetch("https://testapi.tuentrada.com/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    // console.log({resToken: res})
    if (!res.ok) {
      throw new Error(
        `Error getToken !res.ok: ${res.status}. ${res.statusText}`
      );
    }

    //! encriptar el token

    const data = await res.json();
    const { token } = data;
    const tokenExpires = new Date(data.expired_at).getTime();
    setCookie("token", token);
    setCookie("tokenExpires", tokenExpires);
    // console.log(`token expiró, nuevo token: ${token}`)
    localStorage.setItem("token", token);
    localStorage.setItem("tokenExpires", tokenExpires);
    return { token, tokenExpires };
  } catch (error) {
    throw new Error(`Error catch getToken: ${error}`);
  }
}
