export async function getDataCache(url, token, timeRevalidate = 60) {
  try {
    const res = await fetch(url, {
      next: { revalidate: timeRevalidate },
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
    });
    // console.log({getDataPrueba: res})
    const data = await res.json();
    // console.log({dataCache: data})
    return data;
  } catch (error) {
    console.error({ error });
    return { error: error, ok: false, data: [] };
  }
}

export async function sendDataEmail(url, token, email, timeRevalidate = 0) {
  try {
    const res = await fetch(url, {
      next: {
        revalidate: timeRevalidate,
      },
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email,
      }),
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.log({ error });
    return { error: error, ok: false, data: [] };
  }
}

export async function getDataTickets(url, token, email, itilcategoriesId) {
  try {
    const res = await fetch(url, {
      method: "POST",
      next: {
        revalidate: 0,
      },
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
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
    console.log({ error });
    return { error: error, ok: false, data: [] };
  }
}

export async function createForm(url, formData, token) {
  try {
    const res = await fetch(url, {
      method: "POST",
      next: {
        revalidate: 0,
      },
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: formData,
    });

    // console.log({sendDataPost: res})
    const data = await res.json();
    return data;
  } catch (error) {
    console.log({ error });
    return { error: error, ok: false, data: [] };
  }
}

