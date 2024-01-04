import { ContainerForm } from "@/components/container/ContainerForm";

export async function generateStaticParams(){
  return [
    { name: "/mis-entradas/punto-de-venta-fisico"},
    { name: "/tu-entrada-wallet/que-es-tuentrada-wallet"},
    { name: "/tu-entrada-wallet/instrucciones"},
    { name: "/devoluciones/como-solicitar-una-devolucion"},
    { name: "/devoluciones/requisitos-y-aspectos-legales-para-devoluciones"},
    { name: "/mis-entradas/punto-de-venta-fisico"},
    { name: "/devoluciones/preguntas-frecuentes"},
  ]
}

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
      "Completá nuestro formulario de contacto para obtener asistencia personalizada en nuestro Centro de Ayuda y consultas de TuEntrada.",
    keywords: [
      "Formulario de contacto",
      "Asistencia personalizada",
      "Centro de Ayuda TuEntrada",
      "Consultas de usuarios",
      "Soporte al cliente",
      "Resolución de problemas",
      "Ayuda para eventos",
      "Comunicación con TuEntrada",
      "Contacto rápido",
      "Asistencia y consultas",
      "Atención al cliente",
    ],
  };
};

async function FormPage({ params }) {
  return <ContainerForm params={params} />;
}

export default FormPage;
