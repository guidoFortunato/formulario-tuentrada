import { getDataPrueba, getTokenServer } from "@/helpers/getInfoTest";


export default async function sitemap() {

  try {
    const res = await fetch("https://api.tuentrada.com/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "site-at@tuentrada.com",
        password: "mguT@M#SL4iZC&",
      }),
    });

    if (!res.ok) {
      throw new Error(
        `Error getToken !res.ok: ${res.status}. ${res.statusText}`
      );
    }
    const data = await res.json();
    const { token } = data;

    const res2 = await fetch(`https://api.tuentrada.com/api/v1/atencion-cliente/sitemap/ayuda.tuentrada.com`, {
      next: { revalidate: 0 },
      credentials: "include",
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        accept: "application/json",
      },
    });

    const data2 = await res2.json();
    const posts = data2.data.urls.map((item) => {
      return {
        url: item.site,
        lastModified: item.date,
      };
    });
  
   
  
    return [...posts];


  } catch (error) {
    throw new Error({ error });
  }

}

/*
export default async function sitemap() {
  const { token } = await getTokenServer("site-at@tuentrada.com", "mguT@M#SL4iZC&");
  console.log({token})
  const request = await getDataPrueba(
    `https://api.tuentrada.com/api/v1/atencion-cliente/sitemap/ayuda.tuentrada.com`,
    token
  );

  const posts = request.data.urls.map((item) => {
    return {
      url: item.site,
      lastModified: item.date,
    };
  });

  // We generate the XML sitemap with the posts data

  return [...posts];
}*/