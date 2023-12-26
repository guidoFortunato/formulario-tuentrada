import { ContainerFooter } from "./ContainerFooter";
import { ContainerHeader } from "./ContainerHeader";

export const ContainerApp = ({ children }) => {
  return (
    <>
      <ContainerHeader />
      {children}
      <ContainerFooter />
    </>
  );
};
