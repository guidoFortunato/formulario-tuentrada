import { useContext } from "react";
import { FormContext } from "@/context/FormContext";

export const BotonVolver = () => {
  const { currentStep, prevStep, handleSelectDefaultValue } = useContext(FormContext);

  const handleClick = ()=>{
    handleSelectDefaultValue("")
    prevStep()
  }
  return (
    <>
      {currentStep !== 0 && (
        <button
          type="button"
          className="text-white bg-gradient-to-r from-gray-300 to-gray-500 opacity-70 hover:bg-gradient-to-bl font-medium rounded-md text-sm px-5 py-2.5 text-center mr-2 mb-2 mt-10 w-[150px]"
          onClick={handleClick}
        >
          Volver
        </button>
      )}
    </>
  );
};
