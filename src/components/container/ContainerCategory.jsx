"use client";

import { useContext, useEffect, useRef } from "react";
import { FormContext } from "@/context/FormContext";
import { getDataPrueba } from "@/helpers/getInfoTest";
import SubCategoria from "../main/SubCategoria";
import { Loader } from "../loading";


export const ContainerCategory = ({ params }) => {
  const { token } = useContext(FormContext);
  const [dataCategory, setDataCategory] = useState([]);
  const prevDataCategoriesRef = useRef();



  useEffect(() => {
    if (token !== "") {
      if (dataCategory.length === 0) {
        console.log("useEffect container category");
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
    }
  }, [token]);

  if (dataCategory === undefined) return <Loader />;
  if (dataCategory.length === 0) return <Loader />;

  return <SubCategoria category={dataCategory} params={params} />;
};
