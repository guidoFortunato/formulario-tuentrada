"use client";

import { useContext, useEffect } from "react";
import { usePathname } from "next/navigation";
import { FormContext } from "@/context/FormContext";

export const ResetStep = () => {
  const { resetStep } = useContext(FormContext);
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname.includes("formulario")) {
      resetStep();
    }
  }, [pathname]);

  return null;
};
