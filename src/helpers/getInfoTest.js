export async function getDataCache(url, token, timeRevalidate = 60) {
  try {
    const res = await fetch(url, {
      next: { revalidate: timeRevalidate },
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        accept: "application/json",
        "Access-Control-Allow-Origin": "*"
      },
    });
    // console.log({getDataPrueba: res})
    const data = await res.json();
    // console.log({dataCache: data})
    return data;
  } catch (error) {
    console.error({ error });
  }
}

export async function sendDataEmail(url, token, email) {
  try {
    const res = await fetch(url, {
      next: {
        revalidate: 0,
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
  }
}

