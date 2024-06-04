import dynamic from "next/dynamic";
const AdBanner = dynamic(() => import("../adsense/AdBanner"), {
  ssr: false,
});

import { ContainerFooter } from "./ContainerFooter";
import { ContainerHeader } from "./ContainerHeader";

export const ContainerApp = ({ children }) => {
  return (
    <>
      <ContainerHeader />
      {children}
      <AdBanner
        data-ad-slot="4322497970"
        data-full-width-responsive="true"
        data-ad-layout="in-article"
        data-ad-format="fluid"
      />
      <ContainerFooter />
    </>
  );
};
