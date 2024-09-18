import { getDataCache } from "@/helpers/getInfoTest";
import { ContainerLoader } from "./ContainerLoader";

import { FormsApiVerificacion } from "../formulario/estaticos/FormsApiVerificacion";
import GoogleCaptchaWrapper from "@/app/GoogleCaptchaWrapper";
import { redirect } from "next/navigation";

export const ContainerDatosPageServer = async ({ params, token }) => {
  const infoForm = await getDataCache(
    `https://${process.env.NEXT_PUBLIC_API}/api/v1/atencion-cliente/category/${params.categoria}/article/${params.subcategoria}/form`,
    token
  );

  if (!infoForm.status) redirect("/error");

  const dataForm = infoForm?.data;

  if (dataForm !== undefined && dataForm.length === 0)
    return <ContainerLoader />;

  if (dataForm === undefined) redirect("/error");

  return (
    <GoogleCaptchaWrapper>
      <div>
        <FormsApiVerificacion dataForm={dataForm.form} params={params} token={token} />
      </div>
    </GoogleCaptchaWrapper>
  );
};
