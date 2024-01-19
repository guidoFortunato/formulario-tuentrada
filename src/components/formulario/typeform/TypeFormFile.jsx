import { useContext } from "react";
import { FormContext } from "@/context/FormContext";

export const TypeFormFile = ({ item }) => {
  const { register, errors } = useContext(FormContext);
  const name = item.name.toLowerCase().split(" ").join("_");
  return (
    <div>
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {item.name}{" "}
        {item.required === 1 && <span className="text-red-500 ml-1">*</span>}
      </label>

      <input
        type={item.type}
        name={name}
        id={name}
        className={`bg-gray-50 border ${
          errors[name]
            ? "border-red-500 focus:ring-red-500 focus:border-red-dark"
            : "border-gray-300 focus:ring-blue-300 focus:border-blue-dark"
        } text-gray-900 text-sm rounded-lg block w-full`}
        placeholder={item.placeholder}
        {...register(name, {
          required: {
            value: item.required === 1 ? true : false,
            message: "Este campo es obligatorio", //`El ${name.toLowerCase()} es obligatorio`,
          },
          validate: (value) => {
            if (value.length > 0) {
              const allowedFormats = [
                "image/jpeg",
                "image/png",
                "image/webp",
                "image/jpg",
                "image/gif",
                "image/svg+xml",
                "application/pdf",
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
              ];
              const maxFileSize = 3000 * 1024; // 3000 KB

              const isValidFormat = allowedFormats.includes(value[0]?.type);
              const isFileSizeValid = value[0]?.size <= maxFileSize;

              if (!isValidFormat) {
                return "Formato de archivo no permitido. Se admiten formatos: jpg, jpeg, png y webp";
              } else if (!isFileSizeValid) {
                return "El archivo debe pesar menos de 500 KB";
              } else {
                return true; // La validación pasa
              }
            }
            return true; // Si no se ha seleccionado ningún archivo, se considera válido
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
