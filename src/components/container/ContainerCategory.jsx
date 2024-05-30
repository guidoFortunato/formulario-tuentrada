"use client";

import { useContext, useEffect, useState } from "react";
import { FormContext } from "@/context/FormContext";
import { getDataPrueba } from "@/helpers/getInfoTest";
import SubCategoria from "../main/SubCategoria";
import { ContainerLoader } from "./ContainerLoader";
import NotFound from "@/app/not-found";



export const ContainerCategory = ({ params }) => {
  const { token, resetStep, resetDefaultValue, resetGlpiSubCategory } =  useContext(FormContext);
  const [dataCategory, setDataCategory] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  }, []);
  
  useEffect(() => {
    resetStep()
    resetDefaultValue()
    resetGlpiSubCategory()
  }, []);

  useEffect(() => {
    if (token !== "") {
      // if (prevDataCategories !== params.categoria) {
      // console.log("useEffect container category");
      const getDataCategory = async () => {
        const info = await getDataPrueba(
          `https://${process.env.NEXT_PUBLIC_API}/api/v1/atencion-cliente/category/${params.categoria}`,
          token
        );
        // console.log({info})
        if (!info.status) {
          setError(true)
          return
        }
        const category = info?.data?.category;
        setDataCategory(category);
      };
      getDataCategory();
      // }
    }
  }, [token]);

  if (error) return NotFound()
  if (dataCategory.length === 0) return <ContainerLoader />;

  return <SubCategoria category={dataCategory} params={params} />;
};
