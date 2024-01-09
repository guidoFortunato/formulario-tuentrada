import { useContext } from "react";
import { FormContext } from "@/context/FormContext";
import { Datepicker } from "flowbite-react";

export const TypeFormInput = ({ item }) => {
  const { register, errors } = useContext(FormContext);
  const name = item.name.toLowerCase().split(" ").join("_");
  console.log({ item });

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
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-300 focus:border-blue-dark block w-full p-2.5"
        placeholder={item.placeholder}
        {...register(name, {
          required: {
            value: item.required === 1 ? true : false,
            message: "Este campo es obligatorio", //`El ${item.name.toLowerCase()} es obligatorio`,
          },
          pattern: {
            value: item.pattern,
            message: item.pattern !== null && `Ingrese un texto válido`,
          },
        })}
      />
      {errors[name] && (
        <span className="text-red-600 text-sm block mt-1">
          {errors[name].message}
        </span>
      )}
    </div>
  );
};
