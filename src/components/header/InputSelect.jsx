"use client";
import { getDataPrueba } from "@/helpers/getInfoTest";
import AsyncSelect from "react-select/async";

export const InputSelect = () => {
  const loadOptions = async (value, callback) => {
    if (value.length >= 3) {
      const res = await getDataPrueba(
        `https://api.tuentrada.com/api/v1/atencion-cliente/search-article/${value.toLowerCase()}`
      );
      const options = res.data.articles.map((item) => ({
        value: item.title,
        label: item.title,
        slug: item.slug,
      }));
      callback(options);
    }
  };

  return (
    <AsyncSelect
      isSearchable={true}
      placeholder="Escriba una opción..."
      onChange={(value) => console.log(value)}
      loadOptions={loadOptions}
      styles={{
        control: (styles, state) => ({
          ...styles,
          borderRadius: "0.5rem",
          minHeight: "42px",
          marginBottom: "10px",
         
   
         
        
        }),
        option: (styles, state) => ({
          ...styles,
          cursor: "pointer",
          background: state.isSelected ? "#1955A5" : "transparent",
          color: state.isSelected ? "#fff" : "#000",
         
        }),
      }}
    />
  );
};
