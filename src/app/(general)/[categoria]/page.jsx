import { ContainerCategory } from "@/components/container/ContainerCategory";

export const generateMetadata = ({ params }) => {
  let primerLetra;
  let resto;
  let title;
  let primerParte;

  primerLetra = params.categoria.split("-")[0].slice(0, 1).toUpperCase();
  resto = params.categoria.split("-").join(" ");
  title = primerLetra + resto.slice(1);

  if (params.categoria.split("-")[0].includes("tuentrada")) {
    primerParte = "TuEntrada";
    title = primerParte + resto.slice(9);
  }

  return {
    title: title + " - TuEntrada",
    description:
      "Centro de Ayuda TuEntrada: Descargas, Acceso, Estado de Compras, Problemas de Inicio de Sesión, Cambios y Devoluciones, TuEntrada Wallet.",
    keywords: [
      "Centro de ayuda TuEntrada",
      "Descargas de entradas",
      "Acceso al evento",
      "Estado de compras",
      "Problemas de inicio de sesión",
      "Cambios y devoluciones de entradas",
      "Aplicación TuEntrada Wallet",
      "Preguntas frecuentes sobre eventos",
      "Instrucciones para entradas digitales",
      "E-ticket",
      "Transferencia de entradas",
      "Soluciones para problemas técnicos",
      "Uso de TuEntrada Wallet",
      "FAQs de TuEntrada",
    ],
  };
};

const Subcategoria = async ({ params }) => {
  return <ContainerCategory params={params} />;
};

export default Subcategoria;
