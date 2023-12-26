"use client"

import { getDataCache } from "@/helpers/getInfoTest";
import Footer from "../footer/Footer";
import { Loader } from "../loading";
import { useEffect, useState } from "react";


export const ContainerFooter = () => {

  const [dataSite, setDataSite] = useState([]);

  useEffect(() => {
    const getDataSite = async () => {  
      const info = await getDataCache( `https://testapi.tuentrada.com/api/v1/site/ayuda.tuentrada.com`, "12707|5n4wj2vZHLfXa8DcSTqW0dZErhDlZpOU5OeAuqQ4" );
      const data = info?.data?.site;
      setDataSite(data)
    };
    getDataSite()
    
  }, []);

  if(dataSite.length === 0) return <Loader />

  return (
    <>
      <Footer data={dataSite} />
    </>
  );
};
