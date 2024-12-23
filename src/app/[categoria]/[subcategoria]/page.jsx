import Articulo from "@/components/main/Articulo";
import { getData } from "@/utils/getData";
import { notFound, redirect } from "next/navigation";

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
 
  const { res: resArticle, token, status } = await getData(
    `https://${process.env.ENDPOINT_API}/api/v1/atencion-cliente/category/${params.categoria}/article/${params.subcategoria}`
  );

  if (!status) {
    // Redirige a una página 404 si no se encuentra la información
    // notFound()
    redirect(`/error`);
  }

  const { res: resMostViews } = await getData(
    `https://${process.env.ENDPOINT_API}/api/v1/atencion-cliente/articles/most-view`
  );

  const dataArticle = resArticle?.data?.article;
  const dataMostViews = resMostViews?.data?.mostViews;

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
