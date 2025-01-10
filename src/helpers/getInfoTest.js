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

export async function sendDataEmail(url, token, email) {
  try {
    const res = await fetch(url, {
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

export async function createForm (url, token, formData)  {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData
    });

    // Verificar el tipo de contenido de la respuesta
    const contentType = response.headers.get("content-type");
    console.log('Content-Type de la respuesta:', contentType);

    // Si no es una respuesta OK, ver el texto de error
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response:', errorText);
      throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
    }

    // Verificar que la respuesta sea JSON antes de parsearla
    const text = await response.text();
    console.log('Respuesta cruda:', text);

    let data;
    try {
      data = JSON.parse(text);
    } catch (parseError) {
      console.error('Error al parsear JSON:', parseError);
      console.error('Contenido que causó el error:', text);
      throw new Error('Respuesta no válida del servidor');
    }

    return data;
  } catch (error) {
    console.error('Error completo en createForm:', error);
    return {
      status: false,
      message: "Error al crear el ticket: " + error.message
    };
  }
};

// export async function createForm(url, formData, token) {
//   try {
//     const res = await fetch(url, {
//       method: "POST",
//       next: {
//         revalidate: 0,
//       },
//       headers: {
//         Authorization: `Bearer ${token}`,
//         // "Content-Type": "application/json",
//         "Access-Control-Allow-Origin": "*",
//       },
//       body: formData,
//     });

//     // console.log({sendDataPost: res})
//     const data = await res.json();
//     return data;
//   } catch (error) {
//     console.log({ errorcreateForm: error });
//     return { error: error, ok: false, data: [] };
//   }
// }
