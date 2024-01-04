
export async function getDataPrueba(url, token) {
  try {
    const res = await fetch(url, {
      next: { revalidate: 600 },
      // cache: 'no-store',
      credentials: "include",
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        accept: "application/json",
      },
    });

    //! a veces la respuesta es mala pero devuelve un 200: console.log({res})

    const data = await res.json();

    return data;
  } catch (error) {
    console.log({ error }, "error prueba");
  }
}

export async function getDataCache(url, token) {
  try {
    const res = await fetch(url, {
      next: { revalidate: 600 },
      // cache: 'force-cache',
      credentials: "include",
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        accept: "application/json",
      },
    });
    // console.log({getDataPrueba: res})
    const data = await res.json();
    // console.log({dataCache: data})
    return data;
  } catch (error) {
    console.log({ error }, "error prueba");
  }
}

export async function getDataPruebaStorage(url) {
  const tokenStorage = localStorage.getItem("token");
  const tokenExpiresStorage = localStorage.getItem("tokenExpires");

  try {
    if (tokenStorage && tokenExpiresStorage) {
      if (tokenExpiresStorage > Date.now()) {
        const res = await fetch(url, {
          // next: { revalidate: 0 },

          cache: "no-store",
          credentials: "include",
          method: "GET",
          headers: {
            Authorization: `Bearer ${tokenStorage}`,
            accept: "application/json",
          },
        });

        const data = await res.json();
        // console.log({data})
        return data;
      } else {
        const { token, tokenExpires } = await getTokenPrueba();
        localStorage.setItem("token", token);
        localStorage.setItem("tokenExpires", tokenExpires);
        const res = await fetch(url, {
          // next: { revalidate: 0 },

          cache: "no-store",
          credentials: "include",
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            accept: "application/json",
          },
        });

        const data = await res.json();
        // console.log({data})
        return data;
      }
    }
    if (tokenStorage === null && tokenExpiresStorage === null) {
      const { token, tokenExpires } = await getTokenPrueba();

      localStorage.setItem("token", token);
      localStorage.setItem("tokenExpires", tokenExpires);

      const res = await fetch(url, {
        // next: { revalidate: 0 },

        cache: "no-store",
        credentials: "include",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          accept: "application/json",
        },
      });

      const data = await res.json();
      // console.log({data})
      return data;
    }
  } catch (error) {
    console.log({ error }, "error prueba");
  }
}

export async function sendDataEmail(url, token, email) {
  try {
    const res = await fetch(url, {
      method: "POST",
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.log({ error }, "error prueba");
  }
}

export async function getDataTickets(url, token, email, itilcategoriesId) {
  try {
    const res = await fetch(url, {
      method: "POST",
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        itilcategoriesId,
      }),
    });

    // console.log({sendDataPost: res})
    const data = await res.json();
    return data;
  } catch (error) {
    console.log({ error }, "error prueba");
  }
}

export async function createForm(
  url,
  token,
  name,
  email,
  content,
  itilcategoriesId
) {
  try {
    const res = await fetch(url, {
      method: "POST",
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        content,
        itilcategoriesId,
      }),
    });

    console.log({sendDataPost: res})
    const data = await res.json();
    return data;
  } catch (error) {
    console.log({ error }, "error prueba");
  }
}

export async function getTokenServer(
  email = "gfortunato@tuentrada.com",
  password = "Correa.3030"
) {
  try {
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
    return { token, tokenExpires };
  } catch (error) {
    throw new Error(`Error catch getToken: ${error}`);
  }
}
