"use client";

import { useContext } from "react";
import { GoogleTagManager } from "@next/third-parties/google";
import { FormContext } from "@/context/FormContext";
import { Loader } from "../loading";

export const TagManager = () => {
  const { dataSite } = useContext(FormContext);
//   console.log({dataSite})

  if (dataSite === undefined) return <span />;
  if (dataSite.length === 0) return <span />;

  return <GoogleTagManager gtmId={dataSite.tagManager} />;
};
