import { ContainerSubCategory } from "@/components/container/ContainerSubCategory";

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

const ItemSubCategorie = async ({ params }) => {
  return <ContainerSubCategory params={params} />;
};
export default ItemSubCategorie;
