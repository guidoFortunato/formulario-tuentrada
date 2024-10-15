"use client";

import { Fragment, useContext, useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { notFound, useRouter, useSearchParams } from "next/navigation";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { FormContext } from "@/context/FormContext";
import {
  alertErrorRenaper,
  alertErrorRenaperGeneral,
  alertSuccessRenaper,
  alertWarningRenaper,
} from "@/helpers/Alertas";
import { addPrefixesRenaper } from "@/utils/addPrefixes";
import {
  TypeFormCheckbox,
  TypeFormFile,
  TypeFormGlpi,
  TypeFormInput,
  TypeFormRadio,
  TypeFormScanner,
  TypeFormSelect,
  TypeFormTextarea,
} from "../typeform";
import { BotonEnviar } from "./BotonEnviar";
import { ContainerLoader } from "@/components/container/ContainerLoader";

export const FormsApiVerificacion = ({ dataForm, token }) => {
  const { handleSubmit, reset } = useContext(FormContext);
  const [tokenRecaptchaV2, setTokenRecaptchaV2] = useState("");
  const [score, setScore] = useState(null);
  const [errorRecaptcha, setErrorRecaptcha] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const campaignContactId = useSearchParams().get("id");
  const fields = dataForm?.steps[0]?.fields;
  const firstSubject = dataForm?.firstPartSubject;
  const checkValidity = fields.find(
    (item) => item.name.toLowerCase() === "type"
  )?.defaultValue;

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const { executeRecaptcha } = useGoogleReCaptcha();

  const renderForms = fields.map((item) => {
    if (item.type === "input") {
      return (
        <Fragment key={item.name}>
          <TypeFormInput item={item} />
        </Fragment>
      );
    }
    if (item.type === "scanner") {
      return (
        <Fragment key={item.name}>
          <TypeFormScanner item={item} />
        </Fragment>
      );
    }
    if (item.type === "textArea") {
      return (
        <Fragment key={item.name}>
          <TypeFormTextarea item={item} />
        </Fragment>
      );
    }
    if (item.type === "file") {
      return (
        <Fragment key={item.name}>
          <TypeFormFile item={item} />
        </Fragment>
      );
    }
    if (item.type === "select") {
      return (
        <Fragment key={item.name}>
          <TypeFormSelect item={item} />
        </Fragment>
      );
    }
    if (item.type === "subCategoryGlpi") {
      return (
        <Fragment key={item.name}>
          <TypeFormGlpi item={item} />
        </Fragment>
      );
    }
    if (item.type === "radio") {
      return (
        <Fragment key={item.name}>
          <TypeFormRadio item={item} />
        </Fragment>
      );
    }
    if (item.type === "checkbox") {
      return (
        <Fragment key={item.name}>
          <TypeFormCheckbox item={item} />
        </Fragment>
      );
    }
  });

  // console.log({ campaignContactId });

  useEffect(() => {
    if (!campaignContactId) {
      alertErrorRenaper(
        "Error de validación",
        "Si recibiste un correo solicitando la validación de tu identidad, por favor hacé click en el botón que se encuentra en el correo enviado para completar el proceso."
      );
      router.push("/");
    }
  }, []);

  useEffect(() => {
    if (campaignContactId) {
      const checkId = async () => {
        // Crear un nuevo FormData
        try {
          const formDataCheck = new FormData();
          formDataCheck.append("id", campaignContactId);
          const infoCheck = await fetch(
            `https://${process.env.NEXT_PUBLIC_API}/api/v1/atencion-cliente/form/renaper/checks`,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
              },
              body: formDataCheck,
            }
          );

          if (!infoCheck.ok) {
            notFound();
          }

          const resCheck = await infoCheck.json();

          if (!resCheck.status) {
            alertWarningRenaper(resCheck.errors.title, resCheck.errors.message);
            router.push("/");
            return;
          }
        } catch (error) {
          console.log({ error });
          notFound();
        }
      };
      checkId();
    }
  }, []);

  const onSubmit = async (data, event) => {
    event.preventDefault();

    if (process.env.NEXT_PUBLIC_RECAPTCHA_ACTIVE === "true") {
      if (score === null) {
        if (!executeRecaptcha) {
          console.log("not available to execute recaptcha");
          return;
        }

        const gRecaptchaToken = await executeRecaptcha("loginForm");

        try {
          const response = await fetch("/api/recaptcha_google", {
            method: "POST",
            headers: {
              Accept: "application/json, text/plain, */*",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ gRecaptchaToken }),
          });
          const data = await response.json();

          // console.log({ data });

          if (data?.success === true) {
            // console.log(`Success with score: ${data?.score}`);
            setScore(true);
          } else {
            // console.log(`Failure with score: ${data?.score}`);
            setScore(false);
            setIsLoading(false);
            return;
          }
        } catch (error) {
          console.error("Error submitting form:", error);
        }
      }

      if (score === false) {
        setIsLoading(false);
        setErrorRecaptcha(false);
        const response = await fetch("/api/recaptcha_google_v2", {
          method: "POST",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ tokenRecaptchaV2 }),
        });
        const { success } = await response.json();
        // console.log({ success });
        if (!success) {
          setErrorRecaptcha(true);
          // router.push(
          //   "https://www.tuentrada.com/experiencia/ayuda-consulta/bot.html"
          // );
          return;
        }
      }
    }

    const { id, type, ...content } = data;

    // Crear un nuevo FormData
    const formData = new FormData();

    try {
      setIsLoading(true);
      formData.append("id", campaignContactId);
      formData.append("name", firstSubject);
      formData.append("type", checkValidity);

      // Agregar cada propiedad al FormData
      Object.keys(content).forEach((key) => {
        const newKey = addPrefixesRenaper(key, content[key]);

        // Si la propiedad es un archivo, agregarlo al FormData
        if (content[key] instanceof FileList) {
          if (content[key].length > 0) {
            formData.append(newKey, content[key][0]);
          }
        }

        if (content[key].includes("aceptar")) {
          formData.append(newKey, "1");
        } else {
          // Si no es un archivo, agregar el valor normalmente
          formData.append(newKey, content[key]);
        }
      });

      // for (const [clave, valor] of formData.entries()) {
      //   console.log(`${clave}: ${valor}`);
      // }
      // return

      const info = await fetch(
        `https://${process.env.NEXT_PUBLIC_API}/api/v1/atencion-cliente/form/renaper`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (info === undefined || !info.ok) {
        console.log({ info });
        const res = await info.json();
        console.log({ res });
        alertErrorRenaperGeneral();
        return;
      }

      const res = await info.json();
      // console.log({ res });

      if (!res.status) {
        alertErrorRenaper(res.errors.title, res.errors.message);
        return;
      }

      const titleRenaper = res?.data[0]?.title;
      const messageRenaper = res?.data[0]?.message;
      const ticketRenaper = res?.data[0]?.ticket;

      alertSuccessRenaper(titleRenaper, messageRenaper, ticketRenaper);
    } catch (error) {
      alertErrorRenaperGeneral();
      throw new Error(error);
    } finally {
      setIsLoading(false);
      reset();
      router.push("/");
    }
  };

  if (!loaded) return <ContainerLoader />;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-10">
      <div className="grid gap-4 mb-4 sm:grid-cols-2">{renderForms}</div>
      {score === false && (
        <div className="outer-container">
          <div className="inner-container">
            <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY_GOOGLE_V2}
              onChange={(e) => {
                setErrorRecaptcha(false);
                setTokenRecaptchaV2(e);
              }}
            />

            {errorRecaptcha ? (
              <span className="text-red-600 text-xs block mt-1">
                Debe completar el recaptcha
              </span>
            ) : (
              <span className="text-gray-600 text-xs block mt-1">
                Se ha encontrado actividad sospechosa, complete el recaptcha por
                favor
              </span>
            )}
          </div>
        </div>
      )}
      <div className="justify-center flex items-center pb-10">
        <BotonEnviar isLoading={isLoading} />
      </div>
    </form>
  );
};
