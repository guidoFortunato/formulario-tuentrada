import dynamic from "next/dynamic";
const AdBanner = dynamic(() => import("../adsense/AdBanner"), {
  ssr: false,
});

import { ContainerHeaderServer } from "./ContainerHeaderServer";
import { getTokenRedis, saveTokenRedis } from "@/services/redisService";
import { getDataCache } from "@/helpers/getInfoTest";
import Footer from "../footer/Footer";

export const ContainerApp = async({ children }) => {
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
    `https://${process.env.NEXT_PUBLIC_API}/api/v1/site/ayuda.tuentrada.com`,
    token
  );

  if (!info.status) {
    router.push("/error");
    return;
  }
  const dataSite = info?.data?.site;
  return (
    <>
      <ContainerHeaderServer dataSite={dataSite} token={token} />
      {children}
      <AdBanner
        data-ad-slot="4322497970"
        data-full-width-responsive="true"
        data-ad-layout="in-article"
        data-ad-format="fluid"
        
      />
      <Footer data={dataSite} />
    </>
  );
};
