import { ContainerDatosPage } from "@/components/container/ContainerDatosPage";

export const generateMetadata = ({ params }) => {
 
  return {
    title: "Verificación datos de la tarjeta - TuEntrada",
    description:
      "Completá nuestro formulario de de verificación de la tarjeta.",
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

async function DatosPage({ params }){
    return <ContainerDatosPage params={params} />
  }
  
  export default DatosPage