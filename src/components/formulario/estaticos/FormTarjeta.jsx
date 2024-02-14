"use client";

import { useContext, useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { FormContext } from "@/context/FormContext";
import { Email } from "./Email";
import { ConfirmEmail } from "./ConfirmEmail";
import { Dni } from "./Dni";
import { BotonEnviar } from "./BotonEnviar";
import { Name } from "./Name";
import { Lastname } from "./Lastname";
import { FileDniFrente } from "./FileDniFrente";
import { FileDniDorso } from "./FileDniDorso";
import { FileTarjeta } from "./FileTarjeta";
import { addPrefixes } from "@/utils/addPrefixes";
import { alertSuccessTickets } from "@/helpers/Alertas";

export const FormTarjeta = ({ params }) => {
  const { handleSubmit, reset, token } = useContext(FormContext);
  const [captcha, setCaptcha] = useState("");
  const [errorRecaptcha, setErrorRecaptcha] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleRecaptcha = (e) => {
    setCaptcha(e);
    setErrorRecaptcha(false);
  };

  useEffect(() => {
    reset();
  }, []);

  const onSubmit = async (data, event) => {
    event.preventDefault();
    const { email, emailConfirm, ...content } = data;

    // Crear un nuevo FormData
    const formData = new FormData();
    formData.append("email", email);
    formData.append("itilcategoriesId", "13");
    formData.append("name", "Prueba verificación datos");

    try {
      //   if (captcha === "") {
      //     setErrorRecaptcha(true);
      //     return;
      //   }
      setIsLoading(true);

      // Agregar cada propiedad al FormData
      Object.keys(content).forEach((key) => {
        const newKey = addPrefixes(key, content[key]);

        // Si la propiedad es un archivo y no está vacío, agregarlo al FormData
        if (content[key] instanceof FileList) {
          if (content[key].length > 0) {
            formData.append(newKey, content[key][0]);
          }
        } else {
          // Si no es un archivo, agregar el valor normalmente
          formData.append(newKey, content[key]);
        }
        // objectModified[newKey] = content[key];
      });

      // for (const [clave, valor] of formData.entries()) {
      //   console.log(`${clave}: ${valor}`);
      // }
      // return;

      const info = await fetch(
        `https://${process.env.NEXT_PUBLIC_API}/api/v1/atencion-cliente/create/form`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );
      console.log({info})

      if (info === undefined || !info.ok) {
        alertErrorTickets();
        setIsLoading(false);
        return;
      }

      const { data } = await info.json();
      console.log({data})
      const numberTicket = data?.ticketNumber;
      alertSuccessTickets(numberTicket);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto bg-main-image bg-no-repeat bg-left-50  px-10 md:px-20 flex-1">
      <div className="mb-5">
        <h2 className="text-2xl text-blue-dark font-semibold">
          Completá la información
        </h2>
        <p className="text-base text-gray-700 pt-5  ">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus rerum nobis velit, sint repudiandae aliquid labore pariatur itaque debitis placeat ad ullam ratione explicabo omnis natus accusamus voluptatibus ipsam quas.
        </p>
      </div>
      <form className="mt-10" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4 mb-4 grid-cols-1 sm:grid-cols-2">
          <Name />
          <Lastname />
          <Dni />
          <Email />
          <ConfirmEmail />
          <FileDniFrente />
          <FileDniDorso />
          <FileTarjeta />

          {/* <div className="outer-container">
          <div className="inner-container">
            <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
              onChange={handleRecaptcha}
            />
            {errorRecaptcha && (
              <span className="text-red-600 text-sm block mt-1">
                Este campo es obligatorio
              </span>
            )}
         
          </div>
        </div> */}
        </div>
        <div className="justify-center flex pb-10">
          <BotonEnviar isLoading={isLoading} />
        </div>
      </form>
    </div>
  );
};
