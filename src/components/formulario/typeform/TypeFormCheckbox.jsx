import { useContext } from "react";
import { FormContext } from "@/context/FormContext";

export const TypeFormCheckbox = ({ item }) => {
  const { register, errors } = useContext(FormContext);
  const name = item.name.toLowerCase().split(" ").join("_");
  const isPrivacityInName = item.name.toLowerCase().includes("privacidad");
  // console.log({ item });

  return (
    <div className={item.subtype === "hidden" ? "hidden" : ""}>
      <div className="mb-2 text-sm font-medium text-gray-900">
        {item.options?.length === 0 && (
          <input
            id="aceptar"
            type="checkbox"
            value="aceptar"
            name={name}
            className={`w-4 h-4 text-blue-dark bg-gray-100 border-gray-300 focus:ring-blue-dark mr-2 cursor-pointer`}
            {...register(name, {
              required: {
                value: item.required === 1 ? true : false,
                message: "Este campo es obligatorio",
              },
            })}
          />
        )}
        {item.urlLabel ? (
          <>
            {isPrivacityInName ? (
              <>
                <span className="mr-1">Leí y acepto las</span>
                <a
                  href="https://ayuda.tuentrada.com/general/politicas-de-privacidad-y-confidencialidad-de-la-informacion"
                  target="_blank"
                  className="text-blue-dark underline"
                >
                  Políticas de Privacidad
                </a>
                <span className="mx-1">y los</span>
              </>
            ) : (
              <span className="mr-1">{item.name}</span>
            )}

            <a
              href={item.urlLabelLink}
              target={item.urlLabelTarget}
              className="text-blue-dark underline"
            >
              {item.urlLabel}
            </a>
          </>
        ) : (
          <span>{item.name}</span>
        )}
        {item.required === 1 && <span className="text-red-500 ml-1">*</span>}
      </div>
      <ul className="w-48 text-sm font-medium text-gray-900">
        {item.options?.length > 0 && 
          item.options.map((option) => (
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
                      message: "Este campo es obligatorio",
                    },
                  })}
                />
                <label
                  htmlFor={option}
                  className="w-full py-1 ms-2 text-sm font-normal text-gray-900 dark:text-gray-300"
                >
                  {option}
                </label>
              </div>
            </li>
          ))}
      </ul>
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
