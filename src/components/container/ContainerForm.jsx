"use client";

import { useContext, useEffect, useState } from "react";
import { Formularios } from "../formulario/Formularios";
import { FormContext } from "@/context/FormContext";
import { getDataPrueba } from "@/helpers/getInfoTest";
import { Loader } from "../loading";
import { ContainerLoader } from "./ContainerLoader";

const initialState = [];

export const ContainerForm = ({ params }) => {
  const { token } = useContext(FormContext);
  const [dataForm, setDataForm] = useState(initialState);

  useEffect(() => {
    if (token !== "") {
      console.log("useEffect form");
      const getDataForm = async () => {
        const info = await getDataPrueba(
          `https://testapi.tuentrada.com/api/v1/atencion-cliente/category/${params.categoria}/article/${params.subcategoria}/form`,
          token
        );

        setDataForm(info?.data);
      };
      getDataForm();
    }
  }, [token]);

  if (dataForm === undefined) return <Loader />;
  if (dataForm.length === 0) return <ContainerLoader />;

  return <Formularios dataForm={dataForm} params={params} />;
};
