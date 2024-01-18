import { useContext } from "react";
import { FormContext } from "@/context/FormContext";

export const TypeFormInput = ({ item }) => {
  const { register, errors } = useContext(FormContext);
  const name = item.name.toLowerCase().split(" ").join("_");
  

  return (
    <div>
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {item.name}
        {item.required === 1 && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type={item.subtype === "datetime" ? "datetime-local" : item.subtype}
        name={name}
        id={name}
        className={`bg-gray-50 border ${errors[name] ? "border-red-500 focus:ring-red-500 focus:border-red-dark" : "border-gray-300 focus:ring-blue-300 focus:border-blue-dark"} text-gray-900 text-sm rounded-lg block w-full p-2.5`}
        placeholder={item.placeholder}
        {...register(name, {
          required: {
            value: item.required === 1 ? true : false,
            message: "Este campo es obligatorio",
          },
          pattern: {
            value: item.pattern,
            message: item.pattern !== null && `Ingrese un texto válido`,
          },
          minLength: {
            value: item.min,
            message: item.min && `El número mínimo de caracteres es ${item.min}`,
          },
          maxLength: {
            value: item.max,
            message: item.max && `El número mínimo de caracteres es ${item.max}`,
          },
        })}
      />
      {/* {item.helperText && (
        <span className="text-gray-500 text-xs block mt-1">
          {item.helperText}
        </span>
      )} */}
      {errors[name] && (
        <span className="text-red-600 text-xs block mt-1">
          {errors[name].message}
        </span>
      )}
    </div>
  );
};
