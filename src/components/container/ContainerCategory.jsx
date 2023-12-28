"use client";

import { useContext, useEffect, useState } from "react";
import { FormContext } from "@/context/FormContext";
import { getDataPrueba } from "@/helpers/getInfoTest";
import SubCategoria from "../main/SubCategoria";
import { Loader } from "../loading";

const initialState = []

export const ContainerCategory = ({ params }) => {
  const { token } = useContext(FormContext);
  const [dataCategory, setDataCategory] = useState(initialState);
  // console.log({dataCategories})

  useEffect(() => {
    if (token !== "") {
      console.log("useEffect category");
      const getDataCategory = async () => {
        const info = await getDataPrueba(
          `https://testapi.tuentrada.com/api/v1/atencion-cliente/category/${params.categoria}`,
          token
        );
        const category = info?.data?.category;
        setDataCategory(category);
      };
      getDataCategory();
    }
  }, [token]);

  if (dataCategory === undefined) return <Loader />;
  if (dataCategory.length === 0) return <Loader />;

  return <SubCategoria category={dataCategory} params={params} />;
};
