import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { FormContext } from "@/context/FormContext";
import { sendDataEmail } from "@/helpers/getInfoTest";
import { BotonSiguiente, BotonVolver } from ".";
import ReCAPTCHA from "react-google-recaptcha";
// import { Recaptcha } from "./Recaptcha";

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
  const router = useRouter();
  const [tokenRecaptchaV2, setTokenRecaptchaV2] = useState("");
  const [score, setScore] = useState(null);
  const [errorRecaptcha, setErrorRecaptcha] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // // console.log({ score });
  // console.log({ tokenRecaptchaV2 });

  const { executeRecaptcha } = useGoogleReCaptcha();

  // const handleRecaptcha = (e) => {
  //   console.log({ e });
  //   setCaptcha(e);
  //   setErrorRecaptcha(false);
  // };

  useEffect(() => {
    handleContacto(null);
    reset();
  }, []);

  const handleCopy = (e) => {
    e.preventDefault();
  };

  const handlePaste = (e) => {
    e.preventDefault();
  };

  //Boton OnSubmit

  const onSubmit = async (data, event) => {
    event.preventDefault();
    setIsLoading(true);
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

          console.log({ data });

          if (data?.success === true) {
            console.log(`Success with score: ${data?.score}`);
            setScore(true);
          } else {
            console.log(`Failure with score: ${data?.score}`);
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
        console.log({ success });
        if (!success) {
          setErrorRecaptcha(true);
          // router.push(
          //   "https://www.tuentrada.com/experiencia/ayuda-consulta/bot.html"
          // );
          return;
        }
      }
    }

    try {
      setIsLoading(true);
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
            onCopy={handleCopy}
            onPaste={handlePaste}
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
            Confirmación de Correo Electrónico{" "}
            <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="emailConfirm"
            id="emailConfirm"
            onCopy={handleCopy}
            onPaste={handlePaste}
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
                  Se ha encontrado actividad sospechosa, complete el recaptcha
                  por favor
                </span>
              )}
            </div>
          </div>
        )}

        {/* <Recaptcha id="widget-1" /> */}
      </div>
      <div className="justify-center flex pb-10">
        <BotonVolver />
        <BotonSiguiente lengthSteps={lengthSteps} isLoading={isLoading} />
      </div>
    </form>
  );
};
