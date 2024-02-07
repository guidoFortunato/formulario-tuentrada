import { getDataPrueba, getTokenServer } from "@/helpers/getInfoTest";

export default async function sitemap() {
  const { token } = await getTokenServer(process.env.NEXT_PUBLIC_EMAIL, process.env.NEXT_PUBLIC_PASSWORD);
  const request = await getDataPrueba(
    `https://${process.env.NEXT_PUBLIC_API}/api/v1/atencion-cliente/sitemap/ayuda.tuentrada.com`,
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
