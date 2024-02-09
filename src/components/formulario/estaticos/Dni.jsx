import React, { useContext } from "react";
import { FormContext } from "@/context/FormContext";

export const Dni = () => {
  const { register, errors } = useContext(FormContext);
  return (
    <div>
      <label
        htmlFor="dni"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        DNI <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        name="dni"
        id="dni"
        className={`bg-gray-50 border ${
          errors.dni
            ? "border-red-500 focus:ring-red-500 focus:border-red-500"
            : "border-gray-300 focus:ring-blue-300 focus:border-blue-dark"
        } text-gray-900 text-sm rounded-lg block w-full p-2.5`}
        placeholder="Ingrese su DNI"
        {...register("dni", {
          required: {
            value: true,
            message: "El DNI es obligatorio",
          },
          
        })}
      />
      {errors.dni && (
        <span className="text-red-600 text-xs block mt-1">
          {errors.dni.message}
        </span>
      )}
    </div>
  );
};
