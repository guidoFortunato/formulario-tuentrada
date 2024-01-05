import { getDataPrueba, getTokenServer } from "@/helpers/getInfoTest";

export default async function sitemap() {
  const { token } = await getTokenServer();
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
}
