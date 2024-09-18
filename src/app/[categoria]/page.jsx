import { getTokenServerNoEnc } from "@/actions/getTokenServer";
// import { ContainerCategory } from "@/components/container/ContainerCategory";
import SubCategoria from "@/components/main/SubCategoria";
import { getDataCache } from "@/helpers/getInfoTest";
import { getTokenRedis, saveTokenRedis } from "@/services/redisService";
import { redirect } from "next/dist/server/api-utils";

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

export default async function PageSubcategory({ params }) {
  // return <ContainerCategory params={params} />;
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
    `https://${process.env.NEXT_PUBLIC_API}/api/v1/atencion-cliente/category/${params.categoria}`,
    token
  );

  if (!info.status) redirect("/error");

  const category = info?.data?.category;

  return <SubCategoria category={category} params={params} />;
}
