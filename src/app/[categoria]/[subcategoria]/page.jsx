import { getTokenServerNoEnc } from "@/actions/getTokenServer";
import Articulo from "@/components/main/Articulo";
import { getDataCache } from "@/helpers/getInfoTest";
import { getTokenRedis, saveTokenRedis } from "@/services/redisService";

export const generateMetadata = ({ params }) => {
  let primerLetra;
  let resto;
  let title;
  let primerParte;

  primerLetra = params.categoria.split("-")[0].slice(0, 1).toUpperCase();
  resto =
    params.categoria.split("-").join(" ") +
    " - " +
    params.subcategoria.split("-").join(" ");
  title = primerLetra + resto.slice(1);

  if (params.categoria.split("-")[0].includes("tuentrada")) {
    primerParte = "TuEntrada";
    title = primerParte + resto.slice(9);
  }

  return {
    title: title + " - TuEntrada",
    description:
      "Artículos informativos y detallados en nuestro Centro de Ayuda TuEntrada. Obtené respuestas a preguntas comunes y encontrá soluciones para mejorar tu experiencia.",
    keywords: [
      "Artículos informativos",
      "Consejos para eventos",
      "Guías de descargas de entradas",
      "TuEntrada Wallet",
      "Soluciones",
      "Experiencia en eventos",
      "Preguntas frecuentes sobre entradas",
      "Últimas novedades en eventos",
      "Consejos para compras de entradas",
      "Usuarios de TuEntrada",
    ],
  };
};

export default async function ArticlePage({ params }) {
  const tokenRedis = await getTokenRedis();
  let token;

  if (!tokenRedis) {
    const { token: tokenServer } = await getTokenServerNoEnc();
    token = tokenServer;
    await saveTokenRedis("authjs-token-tuen", tokenServer, "604800");
  } else {
    token = tokenRedis;
  }

  const infoArticle = await getDataCache(
    `https://${process.env.NEXT_PUBLIC_API}/api/v1/atencion-cliente/category/${params.categoria}/article/${params.subcategoria}`,
    token
  );

  if (!infoArticle.status) notFound();

  const infoMostViews = await getDataCache(
    `https://${process.env.NEXT_PUBLIC_API}/api/v1/atencion-cliente/articles/most-view`,
    token
  );

  const dataArticle = infoArticle?.data?.article;
  const dataMostViews = infoMostViews?.data?.mostViews;

  if (dataArticle.length === 0 || dataMostViews === undefined)
    return <ContainerLoader />;
  if (dataMostViews.length === 0) return <span></span>;

  return (
    <Articulo
      token={token}
      params={params}
      dataArticle={dataArticle}
      dataMostViews={dataMostViews}
    />
  );
}
