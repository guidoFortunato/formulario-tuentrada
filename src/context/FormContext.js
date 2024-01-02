"use client";
import { createContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { getToken } from "@/helpers/getToken";
import { getDataCache, getDataPrueba } from "@/helpers/getInfoTest";

export const FormContext = createContext();

const FormProvider = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [dataContacto, setDataContacto] = useState(null);
  const [glpiSubCategory, setGlpiSubCategory] = useState("");
  const [subtitleArticle, setSubtitleArticle] = useState("");
  const [selectDefaultValue, setSelectDefaultValue] = useState("");
  const [errorInput, setErrorInput] = useState(false);
  const [token, setToken] = useState("");
  const [tokenExpires, setTokenExpires] = useState("");
  const [dataCategories, setDataCategories] = useState([]);
  const [dataSite, setDataSite] = useState([]);
  const [dataCategory, setDataCategory] = useState([]);
  const [prevDataCategories, setPrevDataCategories] = useState("");

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
    setValue,
    watch,
    control,
  } = useForm();

  const stepsEstaticos = [
    {
      id: 1,
      name: "Información del cliente 1",
      svg: {
        name: "cliente 1",
        path: "M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z",
        viewBox: "0 0 20 16",
        width: "50",
        height: "50",
        fill: "currentColor",
        xmlns: "http://www.w3.org/2000/svg",
      },
      fields: [
        {
          name: "Email",
          type: "input",
          subtype: "text",
          options: null,
          placeholder: "Ingrese su email",
          pattern:
            /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/,
          helperText: null,
          min: null,
          max: null,
          required: 1,
        },
        {
          name: "Confirmación de Email",
          type: "input",
          subtype: "text",
          options: null,
          placeholder: "Ingrese su email",
          pattern: null,
          helperText: null,
          min: null,
          max: null,
          required: 1,
        },
      ],
    },
    {
      id: 2,
      name: "Información del cliente 2",
      svg: {
        name: "cliente 2",
        path: "M18 0H2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM2 12V6h16v6H2Z M6 8H4a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2Zm8 0H9a1 1 0 0 0 0 2h5a1 1 0 1 0 0-2Z",
        viewBox: "0 0 20 14",
        width: "50",
        height: "50",
        fill: "currentColor",
        xmlns: "http://www.w3.org/2000/svg",
      },
      fields: [
        {
          name: "Nombre",
          type: "input",
          subtype: "text",
          options: null,
          placeholder: "Ingrese su nombre",
          pattern: null,
          helperText: null,
          min: null,
          max: null,
          required: 1,
        },
        {
          name: "Apellido",
          type: "input",
          subtype: "text",
          options: null,
          placeholder: "Ingrese su apellido",
          pattern: null,
          helperText: null,
          min: null,
          max: null,
          required: 1,
        },
        {
          name: "Teléfono",
          type: "input",
          subtype: "number",
          options: null,
          placeholder: "Ingrese su teléfono",
          pattern: null,
          helperText: null,
          min: null,
          max: null,
          required: 1,
        },
        {
          name: "DNI",
          type: "input",
          subtype: "text",
          options: null,
          placeholder: "Ingrese su número documento",
          pattern: null,
          helperText: null,
          min: null,
          max: null,
          required: 1,
        },
      ],
    },
  ];

  useEffect(() => {
    const getDataToken = async () => {
      // console.log("useEffect getDataToken context");
      const { token, tokenExpires } = await getToken();
      setToken(token);
      setTokenExpires(tokenExpires);
    };
    getDataToken();
  }, []);

  useEffect(() => {

    if (token !== '') {
      // console.log('useEffect context getDataSite')
      const getDataSite = async () => {  
        const info = await getDataCache( `https://testapi.tuentrada.com/api/v1/site/ayuda.tuentrada.com`, token );
        const data = info?.data?.site;
        setDataSite(data)
      };
      getDataSite()      
    }

  }, [token]);

  useEffect(() => {
    if (token !== "") {
      if (dataCategories.length === 0) {
        // console.log("useEffect container main context");
        const getDataCategories = async () => {
          const info = await getDataPrueba(
            "https://testapi.tuentrada.com/api/v1/atencion-cliente/categories",
            token
          );
          const { categories } = info.data;
          setDataCategories(categories);
        };
        getDataCategories();
      }
    }
  }, [token]);


  const handlePrevDataCategories = (value) => {
    setPrevDataCategories(value);
  };

  const handleCategory = (category) => {
    setDataCategory(category);
  };
 
  const handleContacto = (contacto) => {
    setDataContacto(contacto);
  };

  const handleErrorInput = (boolean) => {
    setErrorInput(boolean);
  };

  const handleSelectDefaultValue = (value) => {
    setSelectDefaultValue(value);
  };

  const handleSubtitleArticle = (name) => {
    setSubtitleArticle(name);
  };

  const handleGlpiSubCategory = (subcategory) => {
    setGlpiSubCategory(subcategory);
  };

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const resetStep = () => {
    setCurrentStep(0);
  };

  return (
    <FormContext.Provider
      value={{
        control,
        currentStep,
        dataCategories,
        dataCategory,
        dataContacto,
        dataSite,
        errorInput,
        errors,
        glpiSubCategory,
        handleCategory,
        handleContacto,
        handleErrorInput,
        handleGlpiSubCategory,
        handlePrevDataCategories,
        handleSelectDefaultValue,
        handleSubmit,
        handleSubtitleArticle,
        nextStep,
        prevDataCategories,
        prevStep,
        register,
        reset,
        resetStep,
        selectDefaultValue,
        setValue,
        stepsEstaticos,
        subtitleArticle,
        token,
        tokenExpires,
        watch,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export default FormProvider;
