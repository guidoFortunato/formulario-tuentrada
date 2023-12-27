import { cookies } from "next/headers";
import Articulo from "@/components/main/Articulo";
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

const ItemSubCategorie = async ({ params }) => {
  let data;
  let dataMostViews;
  const cookieStore = cookies();
  const tokenCookies = cookieStore.get("token");
  const tokenExpiresCookies = cookieStore.get("tokenExpires");
  // let expireCookieToken = false;

  if (!tokenCookies) {
    const { token } = await getTokenServer();
   
    const info = await getDataPrueba(
      `https://testapi.tuentrada.com/api/v1/atencion-cliente/category/${params.categoria}/article/${params.subcategoria}`,
      token
    );
    const infoMostViews = await getDataPrueba(
      `https://testapi.tuentrada.com/api/v1/atencion-cliente/articles/most-view`,
      token
    );
    data = info;
    dataMostViews = infoMostViews;
  }

  if (tokenCookies) {
    const currentDate = Date.now();
    if (currentDate < tokenExpiresCookies) {
      const info = await getDataPrueba(
        `https://testapi.tuentrada.com/api/v1/atencion-cliente/category/${params.categoria}/article/${params.subcategoria}`,
        tokenCookies.value
      );
      const infoMostViews = await getDataPrueba(
        `https://testapi.tuentrada.com/api/v1/atencion-cliente/articles/most-view`,
        tokenCookies.value
      );
      data = info;
      dataMostViews = infoMostViews;
    } else {
      //token expiró
      const { token } = await getTokenServer();
      
      const info = await getDataPrueba(
        `https://testapi.tuentrada.com/api/v1/atencion-cliente/category/${params.categoria}/article/${params.subcategoria}`,
        token
      );
      const infoMostViews = await getDataPrueba(
        `https://testapi.tuentrada.com/api/v1/atencion-cliente/articles/most-view`,
        token
      );
      data = info;
      dataMostViews = infoMostViews;
    }
  }

 

  return (
    <Articulo
      params={params}
      data={data?.data}
      dataArticle={data?.data?.article}
      dataMostViews={dataMostViews?.data?.mostViews}
    />
  );
};
export default ItemSubCategorie;
