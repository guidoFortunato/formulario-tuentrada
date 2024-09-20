
import Articulo from "../main/Articulo";
import { getDataCache } from "@/helpers/getInfoTest";
import { ContainerLoader } from "./ContainerLoader";
import { getTokenRedis, saveTokenRedis } from "@/services/redisService";
import { getTokenServerNoEnc } from "@/actions/getTokenServer";
import { redirect } from "next/dist/server/api-utils";
import { notFound } from "next/navigation";

export const ContainerSubCategoryServer = async({ params }) => {

  const tokenRedis = await getTokenRedis();
  let token;

  if (!tokenRedis) {
    const { token: tokenServer } = await getTokenServerNoEnc();
    token = tokenServer;
    await saveTokenRedis("authjs-token-tuen", tokenServer, "604800");
  } else {
    token = tokenRedis;
  }

  const infoArticle = await getDataCache(
    `https://${process.env.NEXT_PUBLIC_API}/api/v1/atencion-cliente/category/${params.categoria}/article/${params.subcategoria}`,
    token
  );

  if (!infoArticle.status ) notFound();

  const infoMostViews = await getDataCache(
    `https://${process.env.NEXT_PUBLIC_API}/api/v1/atencion-cliente/articles/most-view`,
    token
  );

  const dataArticle = infoArticle?.data?.article;
  const dataMostViews= infoMostViews?.data?.mostViews

  if (dataArticle.length === 0 || dataMostViews === undefined) return <ContainerLoader />;
  if (dataMostViews.length === 0) return <span></span>;

  return (
    <Articulo
      token={token}
      params={params}
      dataArticle={dataArticle}
      dataMostViews={dataMostViews}
    />
  );
};
