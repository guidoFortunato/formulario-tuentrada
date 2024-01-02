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
  // console.log({ dataContactoEnForm2: dataContacto });

  useEffect(() => {
    if (dataContacto !== null) {
      setValue("name", dataContacto.first_name);
      setValue("lastname", dataContacto.last_name);
      setValue("phone", dataContacto.phone_number1);
      setValue("dni", dataContacto.document);
    }
  }, [dataContacto]);

  const onSubmit = (data, event) => {
    event.preventDefault();
    handleContacto({
      first_name: data.name,
      last_name: data.lastname,
      phone_number1: data.phone,
      document: data.dni,
      email: data.email,
      email_confirm: data.emailConfirm,
    });
    // console.log({dataContactoSubmitForm2: dataContacto})
    // console.log("se envia form 2");
    // console.log({ data });
    nextStep();
  };

  return (
    <form className="mt-10" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-4 mb-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Nombre <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-300 focus:border-blue-dark block w-full p-2.5"
            placeholder="Ingrese su nombre"
            {...register("name", {
              required: {
                value: true,
                message: "El nombre es obligatorio",
              },
            })}
          />
          {errors.name && (
            <span className="text-red-600 text-sm block mt-1">
              {errors.name.message}
            </span>
          )}
        </div>
        <div>
          <label
            htmlFor="lastname"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Apellido <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="lastname"
            id="lastname"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-300 focus:border-blue-dark block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Ingrese su apellido"
            {...register("lastname", {
              required: {
                value: true,
                message: "El apellido es obligatorio",
              },
            })}
          />
          {errors.lastname && (
            <span className="text-red-600 text-sm block mt-1">
              {errors.lastname.message}
            </span>
          )}
        </div>
        {/* <div>
          <label
            htmlFor="phone"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Teléfono
          </label>
          <input
            type="text"
            name="phone"
            id="phone"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-300 focus:border-blue-dark block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Ingrese su teléfono"
            {...register("phone")}
          />
        </div> */}
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
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-300 focus:border-blue-dark block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Ingrese su número de documento"
            {...register("dni", {
              required: {
                value: true,
                message: "El DNI es obligatorio",
              },
            })}
          />
          {errors.dni && (
            <span className="text-red-600 text-sm block mt-1">
              {errors.dni.message}
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
