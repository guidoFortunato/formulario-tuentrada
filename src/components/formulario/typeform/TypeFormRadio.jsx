import { useContext } from "react";
import { FormContext } from "@/context/FormContext";

export const TypeFormRadio = ({ item }) => {
  const { register, errors, watch } = useContext(FormContext);
  const name = item.name.toLowerCase().split(" ").join("_");
  // const optionsSelect = item.options.map((item) => ({
  //   value: item,
  //   label: item,
  // }));
  console.log({item})

  // const { field } = useController({ name: name, control });

  // const handleSelectChange = (option) => {
  //   field.onChange(option.value);
  // };

  return (
    <div>
      <span className="mb-4 text-sm font-medium text-gray-900 dark:text-white">
        {item.name} {item.required === 1 && <span className="text-red-500">*</span>}
      </span>
      <ul className="w-48 text-sm font-medium text-gray-900 ">
       {
        item.options.map( option => (
          <li className="w-full" key={option}>
          <div className="flex items-center ps-3">
            <input
              id={option}
              type="radio"
              value={option}
              name={name}
              className="w-4 h-4 text-blue-dark bg-gray-100 border-gray-300 focus:ring-blue-dark"
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

      {watch(name) ? (
        watch(name).slice(0, 2).toLowerCase() === "ot" ? (
          <>
            <input
              type="text"
              name="otra"
              id="otra"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-300 focus:border-blue-dark  block w-full p-2.5 mt-2"
              placeholder={item.helperText}
              {...register("otra", {
                required: {
                  value: item.required === 1 ? true : false,
                  message: "Este campo es obligatorio",
                },
              })}
            />
            {errors["otra"] && (
              <span className="text-red-600 text-sm block mt-1">
                {errors["otra"].message}
              </span>
            )}
          </>
        ) : null
      ) : null}
      {errors[name] && (
        <span className="text-red-600 text-sm block mt-1">
          {errors[name].message}
        </span>
      )}
    </div>
  );
};
