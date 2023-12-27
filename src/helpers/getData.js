import { cookies } from "next/headers";
import { getTokenServer } from "./getInfoTest";

export const getData = async (url) => {
  const cookieStore = cookies();
  const tokenCookies = cookieStore.get("token");
  const tokenExpiresCookies = cookieStore.get("tokenExpires");

  if (!tokenCookies) {
    const { token } = await getTokenServer();
    const data = await getDataCache(url, token);
    return data;
    // await setCookies(token, tokenExpires)
  }

  if (tokenCookies) {
    const currentDate = Date.now();
    if (currentDate < tokenExpiresCookies) {
      //token no expiró
      const data = await getDataCache(url, tokenCookies);
      return data;
    } else {
      //token expiró
      const { token } = await getTokenServer();
      const data = await getDataCache(url, token);
      return data
    }
  }
};
