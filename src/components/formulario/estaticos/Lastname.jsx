import React, { useContext } from "react";
import { FormContext } from "@/context/FormContext";

export const Lastname = () => {
  const { register, errors } = useContext(FormContext);
  return (
    <div>
      <label
        htmlFor="apellido"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Apellido(s) <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        name="apellido"
        id="apellido"
        className={`bg-gray-50 border ${
          errors.apellido
            ? "border-red-500 focus:ring-red-500 focus:border-red-500"
            : "border-gray-300 focus:ring-blue-300 focus:border-blue-dark"
        } text-gray-900 text-sm rounded-lg block w-full p-2.5`}
        placeholder="Ingrese su apellido"
        {...register("apellido", {
          required: {
            value: true,
            message: "El apellido es obligatorio",
          },
          
        })}
      />
      {errors.apellido && (
        <span className="text-red-600 text-xs block mt-1">
          {errors.apellido.message}
        </span>
      )}
    </div>
  );
};
