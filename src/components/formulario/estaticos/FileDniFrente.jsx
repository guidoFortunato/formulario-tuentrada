import React, { useContext } from "react";
import { FormContext } from "@/context/FormContext";

export const FileDniFrente = () => {
  const { register, errors } = useContext(FormContext);
  return (
    <div>
      <label
        htmlFor="frente_dni"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Adjuntar frente del DNI <span className="text-red-500">*</span>
      </label>
      <input
        type="file"
        name="frente_dni"
        id="frente_dni"
        className={`bg-gray-50 border ${
          errors["frente_dni"]
            ? "border-red-500 focus:ring-red-300 focus:border-red-500"
            : "border-gray-300 focus:ring-blue-300 focus:border-blue-dark"
        } text-gray-900 text-sm rounded-lg block w-full`}
        {...register("frente_dni", {
          required: {
            value: true,
            message: "Este campo es obligatorio",
          },
          validate: (value) => {
            if (value.length > 0) {
              const allowedFormats = [
                "image/jpeg",
                "image/png",
                "image/webp",
                "image/jpg",
              ];
              const maxFileSize = 500 * 1024; // 500 KB

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
      {!errors.frente_dni && (
        <span className="text-gray-500 text-xs block mt-1">
          Los formatos de archivo permitidos son: jpg, jpeg, png y webp. Deben pesar menos de 500kb
        </span>
      )}
      {errors.frente_dni && (
        <span className="text-red-600 text-xs block mt-1">
          {errors.frente_dni.message}
        </span>
      )}
    </div>
  );
};
