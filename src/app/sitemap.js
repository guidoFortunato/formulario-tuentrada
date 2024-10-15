
export default async function sitemap() {

  const email = process.env.CREDENTIAL_EMAIL
  const password = process.env.CREDENTIAL_PASSWORD

  try {
    const res = await fetch(`https://${process.env.ENDPOINT_API}/api/login`, {
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
    const data = await res.json();
    const { token } = data;

    const res2 = await fetch(`https://${process.env.ENDPOINT_API}/api/v1/atencion-cliente/sitemap/ayuda.tuentrada.com`, {
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