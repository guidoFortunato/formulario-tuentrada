import { notFound } from "next/navigation";

import { FormsApiVerificacion } from "../formulario/estaticos/FormsApiVerificacion";
import GoogleCaptchaWrapper from "@/app/GoogleCaptchaWrapper";
import { getData } from "@/utils/getData";

export const ContainerDatosPageServer = async ({ params, token }) => {
  const { status, res } = await getData(
    `${process.env.ENDPOINT_API}/api/v1/atencion-cliente/category/${params.categoria}/article/${params.subcategoria}/form`,
    0
  );

  // console.log({infoForm})

  if (!status) notFound();

  const dataForm = res?.data.form;

  return (
    <GoogleCaptchaWrapper>
      <div>
        <FormsApiVerificacion dataForm={dataForm} params={params} token={token} />
      </div>
    </GoogleCaptchaWrapper>
  );
};
