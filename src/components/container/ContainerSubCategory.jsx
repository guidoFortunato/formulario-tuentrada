"use client";

import { FormContext } from "@/context/FormContext";
import { useContext, useEffect, useState } from "react";
import { Loader } from "../loading";
import Articulo from "../main/Articulo";
import { getDataPrueba } from "@/helpers/getInfoTest";
import { ContainerLoader } from "./ContainerLoader";
import NotFound from "@/app/not-found";

export const ContainerSubCategory = ({ params }) => {
  const { token } = useContext(FormContext);
  const [dataSubCategory, setDataSubCategory] = useState([]);
  const [dataMostViews, setDataMostViews] = useState([]);
  const [error, setError] = useState(false);
  // console.log({dataCategories})

  useEffect(() => {
    if (token !== "") {
      // console.log("useEffect subcategory");
      const getDataSubCategory = async () => {
        const info = await getDataPrueba(
          `${process.env.NEXT_PUBLIC_API}atencion-cliente/category/${params.categoria}/article/${params.subcategoria}`,
          token
        );
        if (!info.status) {
          setError(true)
          return
        }
        const infoMostViews = await getDataPrueba(
          `${process.env.NEXT_PUBLIC_API}atencion-cliente/articles/most-view`,
          token
        );
        setDataSubCategory(info);
        setDataMostViews(infoMostViews);
      };
      getDataSubCategory();
    }
  }, [token]);

  if (error) return NotFound()
  if (dataSubCategory.length === 0) return <ContainerLoader />;

  if (dataMostViews === undefined) return <Loader />;
  if (dataMostViews.length === 0) return <span></span>;

  return (
    <Articulo
      params={params}
      data={dataSubCategory?.data}
      dataArticle={dataSubCategory?.data?.article}
      dataMostViews={dataMostViews?.data?.mostViews}
    />
  );
};
