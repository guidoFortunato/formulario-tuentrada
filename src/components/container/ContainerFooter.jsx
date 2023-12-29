"use client";

import { useContext } from "react";
import { FormContext } from "@/context/FormContext";
import Footer from "../footer/Footer";
import { Loader } from "../loading";

export const ContainerFooter = () => {
  const { dataSite } = useContext(FormContext);

  if (dataSite === undefined) return <Loader />;
  if (dataSite.length === 0) return <Loader />;

  return <Footer data={dataSite} />;
};
