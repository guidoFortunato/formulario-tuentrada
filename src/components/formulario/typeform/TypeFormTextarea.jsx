import { useContext } from "react";
import { FormContext } from "@/context/FormContext";

export const TypeFormTextarea = ({ item }) => {
  const { register, errors } = useContext(FormContext);
  const name = (item.name).toLowerCase().split(' ').join('_')
  // console.log({item})

  return (
    <div>
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {item.name} { item.required === 1 && <span className="text-red-500 ml-1">*</span> }
      </label>
      <textarea
        type={item.subtype}
        name={name}
        id={name}
        className={`bg-gray-50 border ${errors[name] ? "border-red-500 focus:ring-red-300 focus:border-red-500" : "border-gray-300 focus:ring-blue-300 focus:border-blue-dark"} text-gray-900 text-sm rounded-lg block w-full p-2.5`}
        placeholder={item.placeholder}
        {...register(name, {
          required: {
            value: item.required === 1 ? true : false,
            message: "Este campo es obligatorio"
          },
          maxLength: {
            value: 900,
            message: "No debe poseer mas de 900 caracteres"
          }
          
        })}
      />
      {item.helperText && !errors[name] && (
        <span className="text-gray-500 text-xs block mt-1">
          {item.helperText}
        </span>
      )}
      {errors[name] && (
        <span className="text-red-600 text-xs block mt-1">
          {errors[name].message}
        </span>
      )}
    </div>
  );
};
