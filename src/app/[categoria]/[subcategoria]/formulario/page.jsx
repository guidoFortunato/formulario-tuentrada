import { cookies } from "next/headers";
import { Formularios } from "@/components/formulario/Formularios";
import { getDataPrueba, getTokenServer } from "@/helpers/getInfoTest";

export const generateMetadata = ({ params }) => {
  let primerLetra;
  let resto;
  let title;
  let primerParte;

  primerLetra = params.categoria.split("-")[0].slice(0, 1).toUpperCase();
  resto =
    params.categoria.split("-").join(" ") +
    " - " +
    params.subcategoria.split("-").join(" ");
  title = primerLetra + resto.slice(1);

  if (params.categoria.split("-")[0].includes("tuentrada")) {
    primerParte = "TuEntrada";
    title = primerParte + resto.slice(9);
  }

  return {
    title: title,
  };
};

async function FormPage({ params }) {
  let data;
  const cookieStore = cookies();
  const tokenCookies = cookieStore.get("token");
  const tokenExpiresCookies = cookieStore.get("tokenExpires");
  // console.log({tokenCookies})

  // let expireCookieToken = false;

  if (!tokenCookies) {
    const { token } = await getTokenServer();
    // console.log('no existe token en cookies, pido uno nuevo')
    const info = await getDataPrueba(
      `https://testapi.tuentrada.com/api/v1/atencion-cliente/category/${params.categoria}/article/${params.subcategoria}/form`,
      token
    );
    data = info?.data;
    
  }

  if (tokenCookies) {
    const currentDate = Date.now();
    // console.log({currentDate, tokenExpiresCookies: tokenExpiresCookies.value})
    if (currentDate < tokenExpiresCookies.value) {
      // console.log('no expiró')
      // console.log({tokenCookieValue: tokenCookies.value})
      const info = await getDataPrueba(
        `https://testapi.tuentrada.com/api/v1/atencion-cliente/category/${params.categoria}/article/${params.subcategoria}/form`,
        tokenCookies.value
      );
      // console.log({info})
      data = info?.data;
    } else {
      //token expiró
      const { token }  = await getTokenServer();
      // console.log("token cookies expiró, pido uno nuevo");
      const info = await getDataPrueba(
        `https://testapi.tuentrada.com/api/v1/atencion-cliente/category/${params.categoria}/article/${params.subcategoria}/form`,
        token
      );
      // console.log({ info });
      data = info?.data;
    }
  }

  // console.log({formPage: dataForm.steps})

  return <Formularios dataForm={data} params={params} />;
}

export default FormPage;



