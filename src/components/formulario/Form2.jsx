import { useContext, useEffect } from "react";

import { FormContext } from "@/context/FormContext";
import { BotonSiguiente, BotonVolver } from ".";

export const Form2 = ({ lengthSteps, dataForm }) => {
  const {
    register,
    handleSubmit,
    errors,
    nextStep,
    dataContacto,
    setValue,
    handleContacto,
  } = useContext(FormContext);

  useEffect(() => {
    if (dataContacto !== null) {
      setValue("nombre", dataContacto.first_name);
      setValue("apellido", dataContacto.last_name);
      setValue("telefono", dataContacto.phone_number1);
      setValue("DNI", dataContacto.document);
    }
  }, [dataContacto]);

  const onSubmit = (data, event) => {
    event.preventDefault();
    handleContacto({
      first_name: data.nombre,
      last_name: data.apellido,
      phone_number1: data.telefono,
      document: data.DNI,
      email: data.email,
      email_confirm: data.emailConfirm,
    });
    nextStep();
  };

  return (
    <form className="mt-10" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-4 mb-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="nombre"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Nombre <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="nombre"
            id="nombre"
            className={`bg-gray-50 border ${errors.nombre ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-blue-300 focus:border-blue-dark"} text-gray-900 text-sm rounded-lg block w-full p-2.5`}
            placeholder="Ingrese su nombre"
            {...register("nombre", {
              required: {
                value: true,
                message: "El nombre es obligatorio",
              },
            })}
          />
          {errors.nombre && (
            <span className="text-red-600 text-xs block mt-1">
              {errors.nombre.message}
            </span>
          )}
        </div>
        <div>
          <label
            htmlFor="apellido"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Apellido <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="apellido"
            id="apellido"
            className={`bg-gray-50 border ${errors.apellido ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-blue-300 focus:border-blue-dark"} text-gray-900 text-sm rounded-lg block w-full p-2.5`}
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
        <div>
          <label
            htmlFor="DNI"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            DNI <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="DNI"
            id="DNI"
            className={`bg-gray-50 border ${errors.DNI ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-blue-300 focus:border-blue-dark"} text-gray-900 text-sm rounded-lg block w-full p-2.5`}
            placeholder="Ingrese su número de documento"
            {...register("DNI", {
              required: {
                value: true,
                message: "El DNI es obligatorio",
              },
            })}
          />
          {errors.DNI && (
            <span className="text-red-600 text-xs block mt-1">
              {errors.DNI.message}
            </span>
          )}
        </div>
      </div>
      <div className="justify-center flex pb-10">
        <BotonVolver />
        <BotonSiguiente lengthSteps={lengthSteps} />
      </div>
    </form>
  );
};
