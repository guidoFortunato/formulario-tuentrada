
import AdSense2 from "../adsense/Adsense2";
import { ContainerFooter } from "./ContainerFooter";
import { ContainerHeader } from "./ContainerHeader";

export const ContainerApp = ({ children }) => {
  return (
    <>
      <ContainerHeader />
      {children}
      <AdSense2 />
      <ContainerFooter />
    </>
  );
};
