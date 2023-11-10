import { useContext } from "react";
import { FormContext } from "@/context/FormContext";

export const TypeFormFile = ({ item }) => {
  const { register, errors } = useContext(FormContext);

  return (
    <div>
      <label
        htmlFor={item.name}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {item.name}
      </label>

      <input
        type={item.type}
        name={item.name}
        id={item.name}
        className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-300 focus:border-blue-dark block w-full  "
        placeholder={item.placeholder}
        {...register(item.name, {
          required: {
            value: item.required === 1 ? true : false,
            message: "Este campo es obligatorio", //`El ${item.name.toLowerCase()} es obligatorio`,
          },
          validate: (value) => {
            // console.log({ value });
            if (value.length > 0) {
              return value[0]?.type !== "image/jpeg" &&
                value[0]?.type !== "image/png" &&
                value[0]?.type !== "image/jpg"
                ? item.helperText
                : value[0]?.size > 60000
                ? "El archivo debe pesar menos de 60kb"
                : true;
            }
            return true;
          },
        })}/>
        
      {errors[item.name] && (
        <span className="text-red-600 text-sm block mt-1">
          {errors[item.name].message}
        </span>
      )}
    </div>
  );
};
