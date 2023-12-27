"use client"

import { useContext, useEffect, useState } from "react";
import { FormContext } from "@/context/FormContext";
import { getDataCache } from "@/helpers/getInfoTest";
import Footer from "../footer/Footer";
import { Loader } from "../loading";


export const ContainerFooter = () => {
  const { token } = useContext(FormContext)
  const [dataSite, setDataSite] = useState([]);

  useEffect(() => {
    if (token !== '') {
      console.log('useEffect footer')
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

  return (
    <>
      <Footer data={dataSite} />
    </>
  );
};
