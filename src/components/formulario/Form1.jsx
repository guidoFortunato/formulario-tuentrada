import { useContext, useEffect, useState } from "react";
import { FormContext } from "@/context/FormContext";
import { BotonSiguiente, BotonVolver } from ".";
import { sendDataEmail } from "@/helpers/getInfoTest";

export const Form1 = ({ lengthSteps }) => {
  const {
    register,
    handleSubmit,
    errors,
    watch,
    nextStep,
    handleContacto,
    reset,
    token,
  } = useContext(FormContext);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    handleContacto(null);
    reset();
  }, []);

  const onSubmit = async (data, event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const info = await sendDataEmail(
        `https://${process.env.NEXT_PUBLIC_API}/api/v1/atencion-cliente/search/contact`,
        token,
        data.email
      );
      // console.log({ data });
      // console.log({info})
      if (info?.status) {
        handleContacto({
          nombre: info.data.contact.first_name,
          apellido: info.data.contact.last_name,
          DNI_STX: info.data.contact.document,
        });
      }
      nextStep();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="mt-10" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-4 mb-4 grid-cols-1 sm:grid-cols-2">
        <div className="user-select: none; ">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Correo electrónico (Email) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="email"
            id="email"
            autoComplete="email"
            className={`bg-gray-50 border  ${
              errors.email
                ? "border-red-500 focus:ring-red-300 focus:border-red-500"
                : "border-gray-300 focus:ring-blue-300 focus:border-blue-dark"
            } text-gray-900 text-sm rounded-lg block w-full p-2.5`}
            placeholder="Correo electrónico (Email)"
            {...register("email", {
              required: {
                value: true,
                message: "Este campo es obligatorio",
              },
              pattern: {
                value:
                  /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Ingrese un correo electrónico válido",
              },
            })}
          />
          {errors.email && (
            <span className="text-red-600 text-xs block mt-1">
              {errors.email.message}
            </span>
          )}
        </div>
        <div>
          <label
            htmlFor="emailConfirm"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Confirmación de Correo Electrónico <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="emailConfirm"
            id="emailConfirm"
            autoComplete="off"
            className={`bg-gray-50 border ${
              errors.emailConfirm
                ? "border-red-500 focus:ring-red-300 focus:border-red-500"
                : "border-gray-300 focus:ring-blue-300 focus:border-blue-dark"
            } text-gray-900 text-sm rounded-lg block w-full p-2.5`}
            placeholder="Repita su correo electrónico"
            {...register("emailConfirm", {
              required: {
                value: true,
                message: "Este campo es obligatorio",
              },
              validate: (value) => {
                return (
                  value === watch("email") ||
                  "Los correo electrónicos deben ser iguales"
                );
              },
            })}
          />

          {errors.emailConfirm && (
            <span className="text-red-600 text-xs block mt-1">
              {errors.emailConfirm.message}
            </span>
          )}
        </div>
        {/* <div className="outer-container">
          <div className="inner-container">
            <Recaptcha />
          </div>
        </div> */}
      </div>
      <div className="justify-center flex pb-10">
        <BotonVolver />
        <BotonSiguiente lengthSteps={lengthSteps} isLoading={isLoading} />
      </div>
    </form>
  );
};
