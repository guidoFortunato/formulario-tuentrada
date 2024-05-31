import AdSense from "../adsense/Adsense";
import { Recaptcha } from "../formulario/Recaptcha";
import { ContainerFooter } from "./ContainerFooter";
import { ContainerHeader } from "./ContainerHeader";

export const ContainerApp = ({ children }) => {
  return (
    <>
      <ContainerHeader />
      {children}
      {/* <AdSense /> */}
      <ContainerFooter />
      {/* <Recaptcha /> */}
    </>
  );
};
