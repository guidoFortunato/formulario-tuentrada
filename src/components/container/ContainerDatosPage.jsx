import { getDataCache } from "@/helpers/getInfoTest";
import { FormsApiVerificacion } from "../formulario/estaticos/FormsApiVerificacion";
import GoogleCaptchaWrapper from "@/app/GoogleCaptchaWrapper";


export const ContainerDatosPage = async ({ params, token }) => {
  const infoForm = await getDataCache(
    `https://${process.env.NEXT_PUBLIC_API}/api/v1/atencion-cliente/category/${params.categoria}/article/${params.subcategoria}/form`,
    token
  );
  
  if (!infoForm.status) notFound();

  const dataForm = infoForm?.data;


  return (
    <GoogleCaptchaWrapper>
      <div>
        <FormsApiVerificacion dataForm={dataForm.form} params={params} token={token} />
      </div>
    </GoogleCaptchaWrapper>
  );
};
