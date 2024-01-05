import { getDataPrueba, getTokenServer } from "@/helpers/getInfoTest";

export default async function sitemap() {
  const { token } = await getTokenServer();
  const request = await getDataPrueba(
    `${process.env.NEXT_PUBLIC_API}atencion-cliente/sitemap/ayuda.tuentrada.com`,
    token
  );

  const posts = request.data.urls.map((item) => {
    console.log({ item });
    return {
      url: item.site,
      lastModified: item.date,
    };
  });

  // We generate the XML sitemap with the posts data

  return [...posts];
}
