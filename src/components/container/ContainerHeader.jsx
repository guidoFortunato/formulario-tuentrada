"use client"
import { useContext } from "react";
import NavBar from "../header/Navbar";
import InputBusqueda2 from "../header/InputBusqueda2";
import { Loader } from "../loading";
import { FormContext } from "@/context/FormContext";

export const ContainerHeader = () => {
  const { dataSite } = useContext(FormContext)

  if(dataSite === undefined) return <span />
  if(dataSite.length === 0 ) return <span />


  //! manejo de errores, cuando dataSite es undefined enviar a pagina de error

  return (
    <header>
      <NavBar data={dataSite} />
      <InputBusqueda2 data={dataSite} />
    </header>
  );
};
