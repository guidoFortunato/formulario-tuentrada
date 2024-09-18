import { getTokenServerNoEnc } from "@/actions/getTokenServer";
import { ContainerForm } from "@/components/container/ContainerForm";
import { ContainerFormServer } from "@/components/container/ContainerFormServer";
import { ContainerLoader } from "@/components/container/ContainerLoader";
import { Formularios } from "@/components/formulario/Formularios";
import { getDataCache } from "@/helpers/getInfoTest";
import { getTokenRedis, saveTokenRedis } from "@/services/redisService";
import { redirect } from "next/navigation";

export async function generateStaticParams() {
  return [
    { name: "/mis-entradas/punto-de-venta-fisico" },
    { name: "/tu-entrada-wallet/que-es-tuentrada-wallet" },
    { name: "/tu-entrada-wallet/instrucciones" },
    { name: "/devoluciones/como-solicitar-una-devolucion" },
    { name: "/devoluciones/requisitos-y-aspectos-legales-para-devoluciones" },
    { name: "/mis-entradas/punto-de-venta-fisico" },
    { name: "/devoluciones/preguntas-frecuentes" },
  ];
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

export default async function FormPage({ params }) {
  const tokenRedis = await getTokenRedis();
  let token;

  if (!tokenRedis) {
    const { token: tokenServer } = await getTokenServerNoEnc();
    token = tokenServer;
    await saveTokenRedis("authjs-token-tuen", tokenServer, "604800");
  } else {
    token = tokenRedis;
  }

  const info = await getDataCache(
    `https://${process.env.NEXT_PUBLIC_API}/api/v1/atencion-cliente/category/${params.categoria}/article/${params.subcategoria}/form`,
    token
  );

  if (!info.status) redirect("/error");

  const dataForm = info?.data;

  // useEffect(() => {
  //   if (params.categoria === "verificacion-datos") {
  //     router.push("/verificacion-datos");
  //     return;
  //   }
  // }, []);

  if (dataForm !== undefined && dataForm.length === 0)
    return <ContainerLoader />;

  return <Formularios dataForm={dataForm} params={params} />;
}

