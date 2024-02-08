import { useContext, useEffect } from "react";
import { FormContext } from "@/context/FormContext";

export const TypeFormGlpi = ({ item }) => {
  const {
    register,
    errors,
    handleGlpiSubCategory,
    handleErrorInput,
    errorInput,
    handleSelectDefaultValue,
    glpiSubCategory,
  } = useContext(FormContext);
  const name = item.name.toLowerCase().split(" ").join("_");

  const handleSelectChange = (e) => {
    if (e.target.value === "Selecciona una opción" && item.required === 1) {
      handleErrorInput(true);
      handleGlpiSubCategory("");
      handleSelectDefaultValue("defaultValue");
      return;
    }
    const glpiSubCategoryItem = item.subCategoryId.find(
      (option) => option.name === e.target.value
    );
    handleSelectDefaultValue(e.target.value);
    handleGlpiSubCategory(glpiSubCategoryItem);
    handleErrorInput(false);
  };

  useEffect(() => {
    if (glpiSubCategory === "" && item.required === 1) {
      handleSelectDefaultValue("defaultValue");
    }
  }, []);

  return (
    <div>
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {item.name}
        {item.required === 1 && <span className="text-red-500 ml-1">*</span>}
      </label>
      <select
        {...register(name, {
          required: {
            value: item.required === 1 ? true : false,
            message: "Este campo es obligatorio", //`El ${item.name.toLowerCase()} es obligatorio`,
          },
        })}
        className={`bg-gray-50 border ${errorInput ? "border-red-500 focus:ring-red-300 focus:border-red-500" : "border-gray-300 focus:ring-blue-300 focus:border-blue-dark"} text-gray-900 text-sm rounded-lg w-full block p-2.5 mt-2`}
        onChange={handleSelectChange}
      >
        <option>Selecciona una opción</option>
        {item.subCategoryId?.map((option) => (
          <option value={option.name} key={option.id}>
            {option.name}
          </option>
        ))}
      </select>
      {item.helperText && !errors[name] && (
        <span className="text-gray-500 text-xs block mt-1">
          {item.helperText}
        </span>
      )}
      {errorInput && item.required === 1 && (
        <span className="text-red-600 text-xs block mt-1">
          Este campo es obligatorio
        </span>
      )}
    </div>
  );
};
