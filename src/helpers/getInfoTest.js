export async function getTokenPrueba(
  email = "gfortunato@tuentrada.com",
  password = "Correa.3030"
) {
  try {
    const res = await fetch("https://testapi.tuentrada.com/api/login", {
      next: { revalidate: 1800 },
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

    const data = await res.json();
    const { token } = data;
    const tokenExpires = new Date(data.expired_at).getTime();
    return { token, tokenExpires };
  } catch (error) {
    throw new Error(`Error catch getToken: ${error}`);
  }
}
export async function getDataPrueba(url) {
  try {
    // const { token, tokenExpires } = await getTokenPrueba();
    const res = await fetch(url, {
      // next: { revalidate: 1800 },
      credentials: "include",
      method: "GET",
      headers: {
        Authorization: `Bearer 4278|N7xt6kokTAoQ3sBmRjCkgo8JjsLVx6Osrc1B4y6u`,
        accept: "application/json",
      },
    });
    
    const data = await res.json();
    // console.log({data})
    return data;
  } catch (error) {
    console.log('error prueba')
  }
}
