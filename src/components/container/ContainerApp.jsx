import dynamic from "next/dynamic";
const AdBanner = dynamic(() => import("../adsense/AdBanner"), {
  ssr: false,
});

import { ContainerHeaderServer } from "./ContainerHeaderServer";
import Footer from "../footer/Footer";
import { getData } from "@/utils/getData";

export const ContainerApp = async ({ children }) => {
  const { res, token } = await getData(
    `https://${process.env.NEXT_PUBLIC_API}/api/v1/site/ayuda.tuentrada.com`
  );

  const dataSite = res?.data?.site;

  return (
    <>
      {/* <ContainerHeaderServer dataSite={dataSite} token={token} /> */}
      {children}
      <AdBanner
        data-ad-slot="4322497970"
        data-full-width-responsive="true"
        data-ad-layout="in-article"
        data-ad-format="fluid"
      />
      {/* <Footer data={dataSite} /> */}
    </>
  );
};
