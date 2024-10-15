"use client";

import { useContext, useEffect, useState } from "react";
import { FormContext } from "@/context/FormContext";
import { getDataCache } from "@/helpers/getInfoTest";
import { ContainerLoader } from "./ContainerLoader";
import { notFound, useRouter } from "next/navigation";
import { FormsApiVerificacion } from "../formulario/estaticos/FormsApiVerificacion";
import GoogleCaptchaWrapper from "@/app/GoogleCaptchaWrapper";


export const ContainerDatosPage = ({ params, token }) => {
  const router = useRouter();
  const [dataForm, setDataForm] = useState(initialState);

  useEffect(() => {
    if (token !== "") {
      // console.log("useEffect form");
      const getDataForm = async () => {
        const info = await getDataCache(
          `https://${process.env.ENDPOINT_API}/api/v1/atencion-cliente/category/${params.categoria}/article/${params.subcategoria}/form`,
          token
        );

        if (!info.status) notFound();
        
        setDataForm(info?.data);
      };
      getDataForm();
    }
  }, [token]);

  if (dataForm !== undefined && dataForm.length === 0)
    return <ContainerLoader />;

  if (dataForm === undefined) notFound();

  return (
    <GoogleCaptchaWrapper>
      <div>
        <FormsApiVerificacion dataForm={dataForm.form} params={params} token={token} />
      </div>
    </GoogleCaptchaWrapper>
  );
};
