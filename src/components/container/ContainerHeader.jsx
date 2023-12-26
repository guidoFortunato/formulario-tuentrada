"use client"
import { useContext, useEffect, useState } from "react";
import { getDataCache } from "@/helpers/getInfoTest";
import NavBar from "../header/Navbar";
import InputBusqueda2 from "../header/InputBusqueda2";
import { Loader } from "../loading";
import { FormContext } from "@/context/FormContext";

export const ContainerHeader = () => {
  const { token } = useContext(FormContext)
  // console.log({token})
  const [dataSite, setDataSite] = useState([]);
  // console.log({dataSite})

  useEffect(() => {
    if (token !== '') {
      const getDataSite = async () => {  
        const info = await getDataCache( `https://testapi.tuentrada.com/api/v1/site/ayuda.tuentrada.com`, token );
        const data = info?.data?.site;
        setDataSite(data)
      };
      getDataSite()
      
    }
    
  }, [token]);

  if(dataSite === undefined) return <Loader />
  if(dataSite.length === 0 ) return <Loader />


  //! manejo de errores, cuando dataSite es undefined enviar a pagina de error

  return (
    <header>
      <NavBar data={dataSite} />
      <InputBusqueda2 data={dataSite} />
    </header>
  );
};
