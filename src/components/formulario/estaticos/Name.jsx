import React, { useContext } from "react";
import { FormContext } from "@/context/FormContext";

export const Name = () => {
  const { register, errors } = useContext(FormContext);
  return (
    <div>
      <label
        htmlFor="name"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Nombre(s) <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        name="name"
        id="name"
        className={`bg-gray-50 border ${
          errors.name
            ? "border-red-500 focus:ring-red-500 focus:border-red-500"
            : "border-gray-300 focus:ring-blue-300 focus:border-blue-dark"
        } text-gray-900 text-sm rounded-lg block w-full p-2.5`}
        placeholder="Ingrese su nombre"
        {...register("name", {
          required: {
            value: true,
            message: "El nombre es obligatorio",
          },
        })}
      />
      {errors.name && (
        <span className="text-red-600 text-xs block mt-1">
          {errors.name.message}
        </span>
      )}
    </div>
  );
};
