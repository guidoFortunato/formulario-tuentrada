import React, { useContext } from "react";
import { FormContext } from "@/context/FormContext";

export const ConfirmEmail = () => {
  const { register, errors, watch } = useContext(FormContext);
  return (
    <div>
      <label
        htmlFor="emailConfirm"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Confirmación de Email <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        name="emailConfirm"
        id="emailConfirm"
        className={`bg-gray-50 border ${
          errors.emailConfirm
            ? "border-red-500 focus:ring-red-300 focus:border-red-500"
            : "border-gray-300 focus:ring-blue-300 focus:border-blue-dark"
        } text-gray-900 text-sm rounded-lg block w-full p-2.5`}
        placeholder="Repita su email"
        {...register("emailConfirm", {
          required: {
            value: true,
            message: "El email es obligatorio",
          },
          validate: (value) => {
            return value === watch("email") || "Los emails deben ser iguales"; 
          },
        })}
      />

      {errors.emailConfirm && (
        <span className="text-red-600 text-xs block mt-1">
          {errors.emailConfirm.message}
        </span>
      )}
    </div>
  );
};
