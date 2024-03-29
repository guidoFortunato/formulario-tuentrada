"use client";

import { useContext, useEffect, useState } from "react";
import { Formularios } from "../formulario/Formularios";
import { FormContext } from "@/context/FormContext";
import { getDataPrueba } from "@/helpers/getInfoTest";
import { ContainerLoader } from "./ContainerLoader";
import { useRouter } from "next/navigation";

const initialState = [];

export const ContainerForm = ({ params }) => {
  const router = useRouter();
  const { token } = useContext(FormContext);
  const [dataForm, setDataForm] = useState(initialState);

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  }, []);

  useEffect(() => {
    if (params.categoria === "verificacion-datos") {
      router.push("/verificacion-datos");
      return;
    }
  }, []);

  useEffect(() => {

    if (token !== "") {
      // console.log("useEffect form");
      const getDataForm = async () => {
        const info = await getDataPrueba(
          `https://${process.env.NEXT_PUBLIC_API}/api/v1/atencion-cliente/category/${params.categoria}/article/${params.subcategoria}/form`,
          token
        );
        if (!info.status) {
          router.push("/");
          return;
        }
        setDataForm(info?.data);
      };
      getDataForm();
    }
  }, [token]);

  if (dataForm !== undefined && dataForm.length === 0) return <ContainerLoader />;

  return <Formularios dataForm={dataForm} params={params} />;
};
