import { cookies } from 'next/headers'
import SubCategoria from "@/components/main/SubCategoria";
import { getDataPrueba, getTokenServer } from "@/helpers/getInfoTest";

export const generateMetadata = ({params})=>{
  let primerLetra;
  let resto;
  let title;
  let primerParte;

  primerLetra = params.categoria.split('-')[0].slice(0,1).toUpperCase()
  resto = params.categoria.split('-').join(" ")
  title = primerLetra + resto.slice(1)
  
  if (params.categoria.split('-')[0].includes("tuentrada")) {
    primerParte = "TuEntrada"
    title = primerParte + resto.slice(9)
  }
 
  return {
    title: title
  }
}

const Subcategoria = async ({ params }) => {
  let data;
  const cookieStore = cookies();
  const tokenCookies = cookieStore.get("token");
  const tokenExpiresCookies = cookieStore.get("tokenExpires");
  // let expireCookieToken = false;


  if (!tokenCookies) {

    const { token } = await getTokenServer()
  
    const info = await getDataPrueba(
      `https://testapi.tuentrada.com/api/v1/atencion-cliente/category/${params.categoria}`,
      token
    );
    data = info?.data?.category
   
  }

  if (tokenCookies) {
    const currentDate = Date.now(); 
    if (currentDate < tokenExpiresCookies) {
      
      const info = await getDataPrueba(
        `https://testapi.tuentrada.com/api/v1/atencion-cliente/category/${params.categoria}`,
        tokenCookies.value
      );
      data = info?.data?.category
    }else{
      //token expiró
      const { token } = await getTokenServer()
    
      const info = await getDataPrueba(
      `https://testapi.tuentrada.com/api/v1/atencion-cliente/category/${params.categoria}`,
      token
      );
      data = info?.data?.category
     
    }
    
  }
  


  return (    
      <SubCategoria category={data} params={params}/>    
  );
};

export default Subcategoria;
