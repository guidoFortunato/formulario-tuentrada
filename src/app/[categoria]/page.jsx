import SubCategoria from "@/components/main/SubCategoria";
import { getData } from "@/utils/getData";
import { notFound, redirect } from "next/navigation";

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

export default async function SubcategoryPage({ params }) {
  const { status, res } = await getData(
    `https://${process.env.ENDPOINT_API}/api/v1/atencion-cliente/category/${params.categoria}`
  );

  if (!status) {
    // Redirige a una página 404 si no se encuentra la información
    // notFound()
    redirect(`/error`);
  }

  const category = res?.data?.category;

  return <SubCategoria category={category} params={params} />;
}
