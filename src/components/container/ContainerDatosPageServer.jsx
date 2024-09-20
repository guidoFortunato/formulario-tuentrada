import { getDataCache } from "@/helpers/getInfoTest";

import { FormsApiVerificacion } from "../formulario/estaticos/FormsApiVerificacion";
import GoogleCaptchaWrapper from "@/app/GoogleCaptchaWrapper";
import { notFound, redirect } from "next/navigation";

export const ContainerDatosPageServer = async ({ params, token }) => {
  const infoForm = await getDataCache(
    `https://${process.env.NEXT_PUBLIC_API}/api/v1/atencion-cliente/category/${params.categoria}/article/${params.subcategoria}/form`,
    token
  );

  // console.log({infoForm})

  if (!infoForm.status) notFound();

  const dataForm = infoForm?.data.form;

  return (
    <GoogleCaptchaWrapper>
      <div>
        <FormsApiVerificacion dataForm={dataForm} params={params} token={token} />
      </div>
    </GoogleCaptchaWrapper>
  );
};
