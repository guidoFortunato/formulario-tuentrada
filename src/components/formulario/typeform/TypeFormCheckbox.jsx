import { useContext } from "react";
import { FormContext } from "@/context/FormContext";

export const TypeFormCheckbox = ({ item }) => {
  const { register, errors, watch } = useContext(FormContext);
  const name = item.name.toLowerCase().split(" ").join("_");

  return (
    <div>
      <span className="mb-4 text-sm font-medium text-gray-900 dark:text-white">
        {item.name} {item.required === 1 && <span className="text-red-500 ml-1">*</span>}
      </span>
      <ul className="w-48 text-sm font-medium text-gray-900 ">
       {
        item.options.map( option => (
          <li className="w-full" key={option}>
          <div className="flex items-center">
            <input
              id={option}
              type="checkbox"
              value={option}
              name={name}
              className={`w-4 h-4 text-blue-dark bg-gray-100 border-gray-300 focus:ring-blue-dark`}
              {...register(name, {
                required: {
                  value: item.required === 1 ? true : false,
                  message: "Este campo es obligatorio", //`El ${item.name.toLowerCase()} es obligatorio`,
                },
              
              })}
            />
            <label
              htmlFor={option}
              className="w-full py-3 ms-2 text-sm font-normal text-gray-900 dark:text-gray-300"
            >
              {option}
            </label>
          </div>
        </li>
        ) )
       }
       
      </ul>

      {errors[name] && (
        <span className="text-red-600 text-xs block mt-1">
          {errors[name].message}
        </span>
      )}
    </div>
  );
};
