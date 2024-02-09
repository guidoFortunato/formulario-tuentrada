import React, { useContext } from "react";
import { FormContext } from "@/context/FormContext";

export const Dni = () => {
  const { register, errors } = useContext(FormContext);
  return (
    <div>
      <label
        htmlFor="email"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Email <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        name="email"
        id="email"
        className={`bg-gray-50 border ${
          errors.email
            ? "border-red-500 focus:ring-red-500 focus:border-red-500"
            : "border-gray-300 focus:ring-blue-300 focus:border-blue-dark"
        } text-gray-900 text-sm rounded-lg block w-full p-2.5`}
        placeholder="Ingrese su email"
        {...register("email", {
          required: {
            value: true,
            message: "El email es obligatorio",
          },
          pattern: {
            value:
              /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/,
            message: "Ingrese un email válido",
          },
        })}
      />
      {errors.email && (
        <span className="text-red-600 text-xs block mt-1">
          {errors.email.message}
        </span>
      )}
    </div>
  );
};
