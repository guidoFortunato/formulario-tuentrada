import { useContext, useEffect, useState } from "react";

import { FormContext } from "@/context/FormContext";
import { BotonSiguiente, BotonVolver } from ".";
import { Controller, useForm } from "react-hook-form";
// import { Recaptcha } from "./Recaptcha";

export const Form2 = ({ lengthSteps, dataForm }) => {
  const {
    register,
    handleSubmit,
    errors,
    nextStep,
    dataContacto,
    setValue,
    handleContacto,
    control,
    isEditDNI,
    handleEditDni,
  } = useContext(FormContext);

  useEffect(() => {
    if (dataContacto !== null) {
      setValue("nombre", dataContacto.nombre);
      setValue("apellido", dataContacto.apellido);
      setValue("DNI_Cliente_Original", dataContacto.DNI_Cliente_Original);
    }
  }, [dataContacto]);

  const handleOriginalButton = () => {
    handleEditDni(false);
    setValue("DNI", dataContacto.DNI);
    // handleDni("");
  };

  const onSubmit = (data, event) => {
    event.preventDefault();
    // handleContacto({
    //   first_name: data.nombre,
    //   last_name: data.apellido,
    //   phone_number1: data.telefono,
    //   document: data.DNI,
    //   email: data.email,
    //   email_confirm: data.emailConfirm,
    // });
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
            Nombre(s) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="nombre"
            id="nombre"
            className={`bg-gray-50 border ${
              errors.nombre
                ? "border-red-500 focus:ring-red-300 focus:border-red-500"
                : "border-gray-300 focus:ring-blue-300 focus:border-blue-dark"
            } text-gray-900 text-sm rounded-lg block w-full p-2.5`}
            placeholder="Ingrese su nombre"
            {...register("nombre", {
              required: {
                value: true,
                message: "Este campo es obligatorio",
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
            Apellido(s) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="apellido"
            id="apellido"
            className={`bg-gray-50 border ${
              errors.apellido
                ? "border-red-500 focus:ring-red-300 focus:border-red-500"
                : "border-gray-300 focus:ring-blue-300 focus:border-blue-dark"
            } text-gray-900 text-sm rounded-lg block w-full p-2.5`}
            placeholder="Ingrese su apellido"
            {...register("apellido", {
              required: {
                value: true,
                message: "Este campo es obligatorio",
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
          {dataContacto === null && (
            <>
              <label
                htmlFor="DNI"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Número de Documento de Identidad (DNI)
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="DNI"
                id="DNI"
                className={`bg-gray-50 border ${
                  errors.DNI
                    ? "border-red-500 focus:ring-red-300 focus:border-red-500"
                    : "border-gray-300 focus:ring-blue-300 focus:border-blue-dark"
                } text-gray-900 text-sm rounded-lg block w-full p-2.5`}
                placeholder="Ingrese su número de documento"
                {...register("DNI", {
                  required: {
                    value: true,
                    message: "Este campo es obligatorio",
                  },
                })}
              />
            </>
          )}
          {dataContacto !== null && !isEditDNI && (
            <Controller
              name="DNI_Cliente_Original"
              control={control}
              defaultValue=""
              rules={{
                required: {
                  value: true,
                  message: "Este campo es obligatorio",
                },
              }}
              render={({ field: { value }, fieldState: { error } }) => (
                <>
                  <label
                    htmlFor="DNI_Cliente_Original"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Número de Documento de Identidad (DNI){" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="DNI_Cliente_Original"
                    id="DNI_Cliente_Original"
                    className={`bg-gray-50 border ${
                      error
                        ? "border-red-500 focus:ring-red-300 focus:border-red-500"
                        : "border-gray-300 focus:ring-blue-300 focus:border-blue-dark"
                    } text-gray-900 text-sm rounded-lg block w-full p-2.5`}
                    placeholder="Ingrese su número de documento"
                    value={
                      value && "*".repeat(value.length - 3) + value.slice(-3)
                    }
                    onChange={() => {}}
                  />
                  <button
                    type="button"
                    className="text-white bg-gradient-to-r from-blue-light to-blue-dark hover:bg-gradient-to-bl font-medium rounded-md text-sm  py-1.5 text-center mt-2 w-[100px] whitespace-nowrap"
                    onClick={() => handleEditDni(true)}
                  >
                    Editar DNI
                  </button>
                </>
              )}
            />
          )}
          {dataContacto !== null && isEditDNI && (
            <>
              <label
                htmlFor="DNI_Cliente_Nuevo"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Número de Documento de Identidad (DNI)
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="DNI_Cliente_Nuevo"
                id="DNI_Cliente_Nuevo"
                className={`bg-gray-50 border ${
                  errors.DNI_Cliente_Nuevo
                    ? "border-red-500 focus:ring-red-300 focus:border-red-500"
                    : "border-gray-300 focus:ring-blue-300 focus:border-blue-dark"
                } text-gray-900 text-sm rounded-lg block w-full p-2.5`}
                placeholder="Ingrese su número de documento"
                {...register("DNI_Cliente_Nuevo", {
                  required: {
                    value: true,
                    message: "Este campo es obligatorio",
                  },
                })}
              />
              <button
                
                type="button"
                className="text-white bg-gradient-to-r from-blue-light to-blue-dark hover:bg-gradient-to-bl font-medium rounded-md text-sm  py-1.5 text-center mt-2 w-[120px] whitespace-nowrap"
                onClick={() => handleOriginalButton()}
              >
                Ver DNI original
              </button>
            </>
          )}

          {errors.DNI_Cliente_Original && (
            <span className="text-red-600 text-xs block mt-1">
              {errors.DNI_Cliente_Original.message}
            </span>
          )}
          {errors.DNI_Cliente_Nuevo && (
            <span className="text-red-600 text-xs block mt-1">
              {errors.DNI_Cliente_Nuevo.message}
            </span>
          )}
          {errors.DNI && (
            <span className="text-red-600 text-xs block mt-1">
              {errors.DNI}
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

// export const Form2 = ({ lengthSteps, dataForm }) => {
//   const {
//     register,
//     handleSubmit,
//     errors,
//     nextStep,
//     dataContacto,
//     setValue,
//     handleContacto,
//     control,
//     isEditDNI,
//     handleEditDni,
//     dni,
//     handleDni,
//   } = useContext(FormContext);

//   // console.log({ isEditDNI });

//   useEffect(() => {
//     console.log('entra useeffect');
//     if (dataContacto !== null) {
//       setValue("nombre", dataContacto.nombre);
//       setValue("apellido", dataContacto.apellido);
//       console.log({ dni });
//       if (dni === "") {
//         console.log( "dni === ''", "dni=",dni );
//         setValue("DNI", dataContacto.DNI);
//       } else {
//         console.log( "dni !== ''","dni=", dni );
//         setValue("DNI", dni);
//       }
//     }
//   }, [dataContacto, dni]);

//   const handleEditButton = () => {
//     handleEditDni(true);
//     setValue("DNI", dni);
//     handleDni("");
//   };
//   const handleOriginalButton = () => {
//     handleEditDni(false);
//     setValue("DNI", dataContacto.DNI);
//     // handleDni("");
//   };

//   const onSubmit = (data, event) => {
//     event.preventDefault();
//     // handleContacto({
//     //   first_name: data.nombre,
//     //   last_name: data.apellido,
//     //   phone_number1: data.telefono,
//     //   document: data.DNI,
//     //   email: data.email,
//     //   email_confirm: data.emailConfirm,
//     // });
//     nextStep();
//   };

//   return (
//     <form className="mt-10" onSubmit={handleSubmit(onSubmit)}>
//       <div className="grid gap-4 mb-4 sm:grid-cols-2">
//         <div>
//           <label
//             htmlFor="nombre"
//             className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//           >
//             Nombre(s) <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="text"
//             name="nombre"
//             id="nombre"
//             className={`bg-gray-50 border ${
//               errors.nombre
//                 ? "border-red-500 focus:ring-red-300 focus:border-red-500"
//                 : "border-gray-300 focus:ring-blue-300 focus:border-blue-dark"
//             } text-gray-900 text-sm rounded-lg block w-full p-2.5`}
//             placeholder="Ingrese su nombre"
//             {...register("nombre", {
//               required: {
//                 value: true,
//                 message: "Este campo es obligatorio",
//               },
//             })}
//           />
//           {errors.nombre && (
//             <span className="text-red-600 text-xs block mt-1">
//               {errors.nombre.message}
//             </span>
//           )}
//         </div>
//         <div>
//           <label
//             htmlFor="apellido"
//             className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//           >
//             Apellido(s) <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="text"
//             name="apellido"
//             id="apellido"
//             className={`bg-gray-50 border ${
//               errors.apellido
//                 ? "border-red-500 focus:ring-red-300 focus:border-red-500"
//                 : "border-gray-300 focus:ring-blue-300 focus:border-blue-dark"
//             } text-gray-900 text-sm rounded-lg block w-full p-2.5`}
//             placeholder="Ingrese su apellido"
//             {...register("apellido", {
//               required: {
//                 value: true,
//                 message: "Este campo es obligatorio",
//               },
//             })}
//           />
//           {errors.apellido && (
//             <span className="text-red-600 text-xs block mt-1">
//               {errors.apellido.message}
//             </span>
//           )}
//         </div>
//         <div>
//           {dataContacto === null && (
//             <>
//               <label
//                 htmlFor="DNI"
//                 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//               >
//                 Número de Documento de Identidad (DNI)
//                 <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 name="DNI"
//                 id="DNI"
//                 className={`bg-gray-50 border ${
//                   errors.DNI
//                     ? "border-red-500 focus:ring-red-300 focus:border-red-500"
//                     : "border-gray-300 focus:ring-blue-300 focus:border-blue-dark"
//                 } text-gray-900 text-sm rounded-lg block w-full p-2.5`}
//                 placeholder="Ingrese su número de documento"
//                 {...register("DNI", {
//                   required: {
//                     value: true,
//                     message: "Este campo es obligatorio",
//                   },
//                 })}
//               />
//             </>
//           )}
//           {dataContacto !== null && !isEditDNI && (
//             <Controller
//               name="DNI"
//               control={control}
//               defaultValue=""
//               rules={{
//                 required: {
//                   value: true,
//                   message: "Este campo es obligatorio",
//                 },
//               }}
//               render={({ field: { value }, fieldState: { error } }) => (
//                 <>
//                   {console.log({ value1: value })}
//                   <label
//                     htmlFor="DNI"
//                     className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                   >
//                     Número de Documento de Identidad (DNI){" "}
//                     <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     name="DNI"
//                     id="DNI"
//                     className={`bg-gray-50 border ${
//                       error
//                         ? "border-red-500 focus:ring-red-300 focus:border-red-500"
//                         : "border-gray-300 focus:ring-blue-300 focus:border-blue-dark"
//                     } text-gray-900 text-sm rounded-lg block w-full p-2.5`}
//                     placeholder="Ingrese su número de documento"
//                     value={
//                       value && "*".repeat(value.length - 3) + value.slice(-3)
//                     }
//                     onChange={() => {}}
//                   />
//                   <button
//                     type="button"
//                     className="text-white bg-gradient-to-r from-blue-light to-blue-dark hover:bg-gradient-to-bl font-medium rounded-md text-sm  py-1.5 text-center mt-2 w-[100px] whitespace-nowrap"
//                     onClick={() => handleEditButton()}
//                   >
//                     Editar DNI
//                   </button>
//                 </>
//               )}
//             />
//           )}{" "}
//           {dataContacto !== null && isEditDNI && (
//             <Controller
//               name="DNI"
//               control={control}
//               defaultValue=""
//               rules={{
//                 required: {
//                   value: true,
//                   message: "Este campo es obligatorio",
//                 },
//               }}
//               render={({
//                 field: { onChange, value },
//                 fieldState: { error },
//               }) => (
//                 <>
//                   {console.log({ value2: value })}
//                   <label
//                     htmlFor="DNI"
//                     className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                   >
//                     Número de Documento de Identidad (DNI){" "}
//                     <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     name="DNI"
//                     id="DNI"
//                     className={`bg-gray-50 border ${
//                       error
//                         ? "border-red-500 focus:ring-red-300 focus:border-red-500"
//                         : "border-gray-300 focus:ring-blue-300 focus:border-blue-dark"
//                     } text-gray-900 text-sm rounded-lg block w-full p-2.5`}
//                     placeholder="Ingrese su número de documento"
//                     onChange={(e) => {
//                       onChange(e);
//                       handleDni(e.target.value);
//                     }}
//                   />
//                   <button
//                     type="button"
//                     className="text-white bg-gradient-to-r from-blue-light to-blue-dark hover:bg-gradient-to-bl font-medium rounded-md text-sm  py-1.5 text-center mt-2 w-[120px] whitespace-nowrap"
//                     onClick={() => handleOriginalButton()}
//                   >
//                     Ver DNI original
//                   </button>
//                 </>
//               )}
//             />
//           )}
//           {errors.DNI && (
//             <span className="text-red-600 text-xs block mt-1">
//               {errors.DNI.message}
//             </span>
//           )}
//         </div>
//       </div>
//       <div className="justify-center flex pb-10">
//         <BotonVolver />
//         <BotonSiguiente lengthSteps={lengthSteps} />
//       </div>
//     </form>
//   );
// };
