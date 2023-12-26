import { redirect } from 'next/navigation';
import { cookies } from 'next/headers'
import SubCategoria from "@/components/main/SubCategoria";
import { getDataPrueba } from "@/helpers/getInfoTest";

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
  const cookieStore= cookies()
  const token = cookieStore.get('token')
  if (!token) redirect('/');
  // console.log({tokenCookies: token})
  const info = await getDataPrueba(`https://testapi.tuentrada.com/api/v1/atencion-cliente/category/${params.categoria}`, "12707|5n4wj2vZHLfXa8DcSTqW0dZErhDlZpOU5OeAuqQ4");
  const category = info?.data?.category;
  // console.log({subcategoria: info})
  return (    
      <SubCategoria category={category} params={params}/>    
  );
};

export default Subcategoria;
