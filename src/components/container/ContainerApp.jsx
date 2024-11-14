import dynamic from "next/dynamic";
const AdBanner = dynamic(() => import("../adsense/AdBanner"), {
  ssr: false,
});

import { ContainerHeaderServer } from "./ContainerHeaderServer";
import Footer from "../footer/Footer";
import { getData } from "@/utils/getData";
import { redirect } from "next/navigation";

export const ContainerApp = async ({ children }) => {
  const { status, res, token } = await getData(
    `${process.env.ENDPOINT_API}/api/v1/atencion-cliente/site/ayuda.tuentrada.com`
  );

  // if (!status) {
  //   // Redirige a una página 404 si no se encuentra la información
  //   redirect(`/error`);
  // }

  const dataSite = res?.data?.site;

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
