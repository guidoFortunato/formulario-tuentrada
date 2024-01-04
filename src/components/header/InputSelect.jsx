"use client";
import { getDataPrueba } from "@/helpers/getInfoTest";
import AsyncSelect from "react-select/async";



export const InputSelect = () => {
  // const [data, setData] = useState(null);
  // const [query, setQuery] = useState(null);

  const loadOptions = async(value, callback) =>{
    // console.log({value})
    if (value.length >= 3) {
      // setQuery(value)
      const res = await getDataPrueba(`https://api.tuentrada.com/api/v1/atencion-cliente/search-article/${value.toLowerCase()}`);
      const options = res.data.articles.map( item => ({value: item.title, label: item.title, slug: item.slug}) )
      // setData(res.data.articles)
      callback(options)
      
    }
  }
  
  return (
    <AsyncSelect
      isSearchable={true}
      placeholder="Escriba una opción..."
      onChange={(value)=>console.log(value)}
      loadOptions={loadOptions}
      // value={optionsSelect.find((item) => item.value === field.value)}
      // options={optionsSelect}
      // onChange={handleSelectChange}
      styles={{
        control: (styles, state) => {
          // console.log({styles, state});

          return {
            ...styles,
            borderRadius: "0.5rem",
            minHeight: "42px",
            marginBottom: "10px",

            "&:hover": {
              borderColor: state.isFocused ? "#1955A5" : "#D1D5DB",
              borderWidth: state.isFocused ? "1px" : "1px",
            },
            borderColor: state.menuIsOpen ? "#1955A5" : "#D1D5DB",
          };
        },
        option: (styles, state) => {
          // console.log({styles, state});
          return {
            ...styles,
            cursor: "pointer",
            background: state.isSelected ? "#1955A5" : "transparent",
            color: state.isSelected ? "#fff" : "#000",
            "&:hover": {
              background: state.isSelected ? "#1955A5" : "#B2D4FF",
              color: state.isSelected ? "#fff" : "#000",
            },
          };
        },

        // placeholder: (styles) => console.log(styles)
      }}
    />
  );
};
