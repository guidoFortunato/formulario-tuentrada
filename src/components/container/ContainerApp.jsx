import { Adsense } from "../adsense/Adsense";
import { ContainerFooter } from "./ContainerFooter";
import { ContainerHeader } from "./ContainerHeader";


export const ContainerApp = ({ children }) => {
  return (
    <>
      <ContainerHeader />
      {children}
     <Adsense  />
      <ContainerFooter />
    </>
  );
};
