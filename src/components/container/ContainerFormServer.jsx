import { Formularios } from "../formulario/Formularios";
import { getDataCache } from "@/helpers/getInfoTest";
import { ContainerLoader } from "./ContainerLoader";
import { getTokenRedis, saveTokenRedis } from "@/services/redisService";
import { getTokenServerNoEnc } from "@/actions/getTokenServer";
import { redirect } from "next/navigation";

export const ContainerFormServer = async ({ params }) => {
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

  return <Formularios dataForm={dataForm} params={params} token={token} />;
};
