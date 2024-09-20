"use client";

import { useContext, useEffect, useState } from "react";
import { FormContext } from "@/context/FormContext";
import { getDataPrueba } from "@/helpers/getInfoTest";
import { ContainerLoader } from "./ContainerLoader";
import { notFound, useRouter } from "next/navigation";
import { FormsApiVerificacion } from "../formulario/estaticos/FormsApiVerificacion";
import GoogleCaptchaWrapper from "@/app/GoogleCaptchaWrapper";

const initialState = [];

export const ContainerDatosPage = ({ params }) => {
  const router = useRouter();
  const { token } = useContext(FormContext);
  const [dataForm, setDataForm] = useState(initialState);

  useEffect(() => {
    if (token !== "") {
      // console.log("useEffect form");
      const getDataForm = async () => {
        const info = await getDataPrueba(
          `https://${process.env.NEXT_PUBLIC_API}/api/v1/atencion-cliente/category/${params.categoria}/article/${params.subcategoria}/form`,
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
        <FormsApiVerificacion dataForm={dataForm.form} params={params} />
      </div>
    </GoogleCaptchaWrapper>
  );
};
