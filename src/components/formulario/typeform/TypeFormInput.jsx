import { useContext } from "react";
// import Script from "next/script";
// import { Controller } from "react-hook-form";
// import { Datepicker } from "flowbite-react";
import { FormContext } from "@/context/FormContext";
// import { Flowbite } from "flowbite-react";

// Meses en español
// const meses = [
//   "Enero",
//   "Febrero",
//   "Marzo",
//   "Abril",
//   "Mayo",
//   "Junio",
//   "Julio",
//   "Agosto",
//   "Septiembre",
//   "Octubre",
//   "Noviembre",
//   "Diciembre",
// ];

export const TypeFormInput = ({ item }) => {
  const { register, errors, control, watch } = useContext(FormContext);
  const nameInput = item.name;
  // console.log({item})

  return (
    <>
      {/* <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.2.1/datepicker.min.js"
        async
        defer
      ></Script> */}
      <div className={ item.subtype === "hidden" ? "hidden" : "" }>
        <label
          htmlFor={item.subtype === "emailConfirm" ? item.subtype : nameInput}
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          {nameInput}
          {item.required === 1 && <span className="text-red-500 ml-1">*</span>}
        </label>

        {/* Datepicker flowbite */}

        {/* <div className="relative max-w-sm">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
            </svg>
          </div>
          <input
            datepicker="true"
            datepicker-buttons="true"
            datepicker-autohide="true"
            datepicker-format="dd/mm/yyyy"
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 "
            placeholder="Select date"
          />
        </div> */}

        {/* Datepicker html */}

        <input
          type={
            item.subtype === "datetime"
              ? "datetime-local"
              : item.subtype === "emailConfirm" || item.subtype === "email"
              ? "text"
              : item.subtype
          }
          id={item.subtype === "emailConfirm" ? item.subtype : nameInput}
          className={`bg-gray-50 border ${
            errors[nameInput] || errors[item.subtype]
              ? "border-red-500 focus:ring-red-300 focus:border-red-500"
              : "border-gray-300 focus:ring-blue-300 focus:border-blue-dark"
          } text-gray-900 text-sm rounded-lg block w-full p-2.5`}
          placeholder={item.placeholder}
          {...register(
            item.subtype === "emailConfirm" ? item.subtype : nameInput,
            {
              required: {
                value: item.required === 1 ? true : false,
                message: "Este campo es obligatorio",
              },
              validate: (value) => {
                // console.log({value: item.subtype})
                // Filtra los campos que contienen la palabra "email" pero no son "emailConfirm"
                const objectFields = watch()
                const fields = Object.keys(objectFields).filter(
                  (field) =>
                    (field.toLowerCase().includes("correo") ||
                      field.toLowerCase().includes("email")) &&
                    field.toLowerCase() !== "emailconfirm"
                );
                // Obtiene los valores correspondientes a esos campos
                const valueFieldEmail = fields.map(
                  (field) => objectFields[field]
                );
              
                if (item.subtype === "emailConfirm") {

                  return (
                    value === valueFieldEmail[0] || "Los emails deben ser iguales"
                  );
                }
              },
              pattern: {
                value:
                  item.subtype === "email" &&
                  /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/,
                message: `Ingrese un texto válido`,
              },
              minLength: {
                value: item.min,
                message: `El número mínimo de caracteres es ${item.min}`,
              },
              maxLength: {
                value: item.max,
                message: `El número máximo de caracteres es ${item.max}`,
              },
            }
          )}
        />

        {/* Datepicker flowbite-react */}

        {/* {item.subtype === "datetime" || item.subtype === "date" ? (
        <Controller
        name={name}
        control={control}
        defaultValue=""
        rules={{ required: "Este campo es obligatorio" }}
        render={({ field }) => (
          <Flowbite theme={{ datepicker: customTheme.datepicker }}>
          <Datepicker
          type="text"
          value={field.value}
          onSelectedDateChanged={(date) => {
            // Obtener día, mes y año
            const dia = date.getDate();
            const mes = meses[date.getMonth()];
            const anio = date.getFullYear();
            return field.onChange(`${dia} de ${mes}, ${anio}`);
          }}
                maxDate={new Date()}
                // className="border rounded px-4 py-2 w-full"
                weekStart={3}
                language="es-ES"
                labelTodayButton="Hoy"
                labelClearButton="Limpiar"
                background="primary"
                className="block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 bg-red-700 text-white hover:bg-cyan-600"
                
                />
                </Flowbite>
                )}
                />
                ) : (
                  <input
                  type={item.subtype}
                  name={name}
                  id={name}
                  className={`bg-gray-50 border ${
                    errors[name]
                    ? "border-red-500 focus:ring-red-300 focus:border-red-500"
                    : "border-gray-300 focus:ring-blue-300 focus:border-blue-dark"
                  } text-gray-900 text-sm rounded-lg block w-full p-2.5`}
                  placeholder={item.placeholder}
          {...register(name, {
            required: {
              value: item.required === 1 ? true : false,
              message: "Este campo es obligatorio",
            },
            pattern: {
              value: item.pattern,
              message: item.pattern !== null && `Ingrese un texto válido`,
            },
            minLength: {
              value: item.min,
              message:
                item.min && `El número mínimo de caracteres es ${item.min}`,
              },
            maxLength: {
              value: item.max,
              message:
              item.max && `El número máximo de caracteres es ${item.max}`,
            },
          })}
        />
      )} */}
        {item.helperText && !errors[nameInput] && (
          <span className="text-gray-500 text-xs block mt-1">
            {item.helperText}
          </span>
        )}
        {errors[nameInput] && (
          <span className="text-red-600 text-xs block mt-1">
            {errors[nameInput].message}
          </span>
        )}
        {errors[item.subtype] && (
          <span className="text-red-600 text-xs block mt-1">
            {errors[item.subtype].message}
          </span>
        )}
      </div>
    </>
  );
};
