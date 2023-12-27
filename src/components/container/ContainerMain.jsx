"use client";

import { useContext, useEffect, useState } from "react";
import { FormContext } from "@/context/FormContext";
import { getDataPrueba } from "@/helpers/getInfoTest";
import { Loader } from "@/components/loading";
import { SectionMain } from "../main/SectionMain";

export const ContainerMain = () => {
  const { token } = useContext(FormContext);
  const [dataCategories, setDataCategories] = useState([]);
  console.log("main");

  useEffect(() => {
    if (token !== "") {
      console.log("useEffect main");
      const getDataCategories = async () => {
        const info = await getDataPrueba(
          "https://testapi.tuentrada.com/api/v1/atencion-cliente/categories",
          token
        );
        const data = info?.data?.categories;
        setDataCategories(data);
      };
      getDataCategories();
    }
  }, [token]);

  if (dataCategories === undefined) return <Loader />;
  if (dataCategories.length === 0) return <span></span>;

  //! manejo de errores, cuando dataCategories es undefined enviar a pagina de error

  const firstCategories = dataCategories.slice(0, 2);
  const thirdCategory = dataCategories.slice(2, 3);
  const restCategories = dataCategories.slice(3);

  return (
    <main>
      <SectionMain
        firstCategories={firstCategories}
        thirdCategory={thirdCategory}
        restCategories={restCategories}
      />
    </main>
  );
};
