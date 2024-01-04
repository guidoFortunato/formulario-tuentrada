"use client";
import { getDataPrueba } from "@/helpers/getInfoTest";
import { createContext, useContext, useEffect, useState } from "react";
export const DataContext = createContext();


const apiGeneral = 'https://api.tuentrada.com/api/v1/ayuda.tuentrada.com'
const apiCategorias = 'https://api.tuentrada.com/api/v1/atencion-cliente/categories'
const apiCategoria = 'https://api.tuentrada.com/api/v1/atencion-cliente/category/1'

const dataPrueba = []



const DataProvider = ({ children }) => {
  const [dataGeneral, setDataGeneral] = useState(null);

  // useEffect(() => {
  //   const getDateGeneral = async()=>{
  //     const dataGeneral = await getDataPrueba(apiGeneral)
  //     setDataGeneral(dataGeneral)
  //   }
  //   getDateGeneral()
  // }, []);

 
  return <DataContext.Provider value={dataGeneral}>{children}</DataContext.Provider>;
};

export default DataProvider;
