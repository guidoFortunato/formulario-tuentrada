import { useContext } from "react";
import { FormContext } from "@/context/FormContext";

export const TypeFormFile = ({ item }) => {
  const { register, errors } = useContext(FormContext);
  const name = (item.name).toLowerCase().split(' ').join('_')
  return (
    <div>
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {item.name} { item.required === 1 && <span className="text-red-500 ml-1">*</span> }
      </label>

      <input
        type={item.type}
        name={name}
        id={name}
        className={`bg-gray-50 border ${errors[name] ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-blue-300 focus:border-blue-dark"} text-gray-900 text-sm rounded-lg block w-full`}
        placeholder={item.placeholder}
        {...register(name, {
          required: {
            value: item.required === 1 ? true : false,
            message: "Este campo es obligatorio", //`El ${name.toLowerCase()} es obligatorio`,
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
        })}
      />
      {errors[name] && (
        <span className="text-red-600 text-xs block mt-1">
          {errors[name].message}
        </span>
      )}
    </div>
  );
};
