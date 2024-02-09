// import { ContainerFormTarjeta } from "@/components/container/ContainerFormTarjeta";
import { FormTarjeta } from "@/components/formulario/estaticos/FormTarjeta";

export const generateMetadata = ({ params }) => {
 
  return {
    title: "Verificación datos del DNI - TuEntrada",
    description:
      "Completá nuestro formulario de contacto verificar datos del DNI.",
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

async function TarjetaPage({ params }){
  return <FormTarjeta params={params} />;
};

export default TarjetaPage;
