"use client";

import { useContext } from "react";
import { FormContext } from "@/context/FormContext";
import Footer from "../footer/Footer";
import { Loader } from "../loading";

export const ContainerFooter = () => {
  const { dataSite } = useContext(FormContext);

  if (dataSite === undefined) return <span />;
  if (dataSite.length === 0) return <span />;

  return <Footer data={dataSite} />;
};
