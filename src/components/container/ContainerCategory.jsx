"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { FormContext } from "@/context/FormContext";
import { getDataPrueba } from "@/helpers/getInfoTest";
import SubCategoria from "../main/SubCategoria";
import { Loader } from "../loading";
import { Skeleton } from "../skeleton/Skeleton";

export const ContainerCategory = ({ params }) => {
  const { token, prevDataCategories, handlePrevDataCategories } =
    useContext(FormContext);
  const [dataCategory, setDataCategory] = useState([]);

  // console.log({prevDataCategories, params: params.categoria})
  // console.log({dataCategory})

  useEffect(() => {
    if (token !== "") {
      // if (prevDataCategories !== params.categoria) {
      console.log("useEffect container category");
      const getDataCategory = async () => {
        const info = await getDataPrueba(
          `https://testapi.tuentrada.com/api/v1/atencion-cliente/category/${params.categoria}`,
          token
        );
        const category = info?.data?.category;
        setDataCategory(category);
        handlePrevDataCategories(params.categoria);
      };
      getDataCategory();
      // }
    }
  }, [token]);

  if (dataCategory === undefined) return <Loader />;
  if (dataCategory.length === 0)
    return (
      <div className="container mx-auto bg-main-image bg-no-repeat bg-left-50 pb-10 flex-1">
        <section className="w-[80%] grid grid-cols-1 md:grid-cols-2 justify-items-center gap-4 mx-auto mt-4"><Loader /></section>
      </div>
    );

  return <SubCategoria category={dataCategory} params={params} />;
};
