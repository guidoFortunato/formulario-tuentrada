


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
    // console.log({getDataPrueba: res})
    const data = await res.json();
    // console.log({getDataPrueba: data})
    return data;
  } catch (error) {
    console.log({error}, "error prueba");
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
    console.log({error}, "error prueba");
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
    console.log({error}, "error prueba");
  }
}

export async function sendDataEmail(url, token, email) {

  try {
    const res = await fetch(url, {
      method: "POST",
      cache: 'no-store',
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    });

    console.log({sendDataPost: res})
    const data = await res.json();
    return data;
  } catch (error) {
    console.log({error}, "error prueba");
  }
}

export async function getDataTickets(url, token, email, itilcategoriesId ) {

  try {
    const res = await fetch(url, {
      method: "POST",
      cache: 'no-store',
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        itilcategoriesId
      }),
    });

    // console.log({sendDataPost: res})
    const data = await res.json();
    return data;
  } catch (error) {
    console.log({error}, "error prueba");
  }
}


export async function createForm(url, token, email, name, content, itilcategoriesId) {

  try {
    const res = await fetch(url, {
      method: "POST",
      cache: 'no-store',
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        name,
        content,
        itilcategoriesId
      }),
    });

    // console.log({sendDataPost: res})
    const data = await res.json();
    return data;
  } catch (error) {
    console.log({error}, "error prueba");
  }
}


