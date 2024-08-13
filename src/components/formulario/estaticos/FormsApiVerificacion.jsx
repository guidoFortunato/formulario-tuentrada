import { Fragment, useContext, useState } from "react";
import Script from "next/script";
import { useRouter, useSearchParams } from "next/navigation";
import { getDataTickets } from "@/helpers/getInfoTest";
import { FormContext } from "@/context/FormContext";
import {
  alertSuccessTickets,
  alertWarningTickets,
  alertErrorTickets,
} from "@/helpers/Alertas";
import { addPrefixes } from "@/utils/addPrefixes";
import { BotonEnviar } from "./BotonEnviar";
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
import ReCAPTCHA from "react-google-recaptcha";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

export const FormsApiVerificacion = ({ dataForm, params }) => {
  const { handleSubmit, reset, token } = useContext(FormContext);
  const [tokenRecaptchaV2, setTokenRecaptchaV2] = useState("");
  const [score, setScore] = useState(null);
  const [errorRecaptcha, setErrorRecaptcha] = useState(false);
  const [loadingCheckHaveTickets, setLoadingCheckHaveTickets] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const contact_id = useSearchParams().get("contact_id");
  const fields = dataForm?.steps[0]?.fields;
  const firstSubject = dataForm?.firstPartSubject;
  const secondSubject = dataForm?.secondPartSubject;
  // console.log({ contact_id });
  // console.log({params})
  
  const { executeRecaptcha } = useGoogleReCaptcha();

  const renderForms = dataForm.steps[0].fields.map((item) => {
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
          <TypeFormCheckbox item={item} params={params} />
        </Fragment>
      );
    }
  });

  const onSubmit = async (data, event) => {
    event.preventDefault();
    // console.log({ dataFormsDniTarjeta: data });
    
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

    console.log('pasa el recaptcha')
    console.log({data})

    return



    const { emailConfirm, ...content } = data;
    const valueEmail = [];

    Object.keys(content).map((key) => {
      if (
        key.toLowerCase().includes("email") ||
        key.toLowerCase().includes("correo")
      ) {
        valueEmail.push(content[key]);
      }
    });
    const email = valueEmail.join("");

    // return
    if (dataForm.steps[0].checkHaveTickets === 1) {
      let id;

      try {
        setLoadingCheckHaveTickets(true);

        const info = await getDataTickets(
          `https://${process.env.NEXT_PUBLIC_API}/api/v1/atencion-cliente/search/tickets`,
          token,
          email,
          "13"
        );
        console.log({ infoGetDataTickets: info });
        // tickets abiertos
        if (info?.data?.tickets?.length > 0) {
          // const haveCloseForm = info?.data?.tickets.some((ticket) => ticket.closeForm === 1);
          const ticketsCloseForm = info.data.tickets.filter(
            (ticket) => ticket.closeForm === 1
          );
          if (ticketsCloseForm.length > 0) {
            const ticketNumber = ticketsCloseForm[0].number;
            const status = ticketsCloseForm[0].status;
            const message = ticketsCloseForm[0].message;
            const date = ticketsCloseForm[0].dateCreated
              .split(" ")[0]
              .split("-");
            const day = date[2];
            const month = date[1];
            const year = date[0];
            const time = ticketsCloseForm[0].dateCreated
              .split(" ")[1]
              .split(":");
            const hours = time[0];
            const minutes = time[1];
            const finalDate = `${day}-${month}-${year} a las ${hours}:${minutes}hs`;

            alertWarningTickets(ticketNumber, finalDate, status, message);
            reset();
            resetStep();
            router.push("/");
            return;
          }
        }
      } catch (error) {
        console.log({ error });
      } finally {
        setLoadingCheckHaveTickets(false);
      }
    }

    //Form final
    let id;
    const subject = [];

    secondSubject?.map((id) => {
      // console.log({id})
      fields?.map((item) => {
        // console.log({item})
        if (id === String(item.id)) {
          // console.log(`id: ${id} == item.id: ${item.id}`)
          Object.keys(data).map((key) => {
            // console.log({key})
            if (key === item.name) {
              // console.log(`key: ${key} == item.name: ${item.name}`)
              subject.push(data[key]);
              return;
            }
          });
        }
      });
    });

    // console.log({subject})
    const finalSubject = subject.join(" - ");
    // console.log({finalSubject})
    // return

    // Crear un nuevo FormData
    const formData = new FormData();
    formData.append("email", email);
    formData.append("name", `${firstSubject}: ${finalSubject}`);
    formData.append("itilcategoriesId", "13");
    formData.append("info_contact_id", contact_id);

    try {
      setIsLoading(true);

      //   if (glpiSubCategory === "" || glpiSubCategory === undefined) {
      //     const { categoryId } = stepNow;
      //     id = Object.keys(categoryId)[0];
      //     itilcategoriesId;
      //     formData.append("itilcategoriesId", id);
      //   }

      //   if (glpiSubCategory !== "" && glpiSubCategory !== undefined) {
      //     id = glpiSubCategory.id;
      //     formData.append("itilcategoriesId", id);
      //   }

      // Agregar cada propiedad al FormData
      Object.keys(content).forEach((key) => {
        const newKey = addPrefixes(key, content[key]);

        // Verificar si el valor es una fecha y formatearlo
        // const formattedValue = isDateFormat(content[key])
        //   ? formatDateString(content[key])
        //   : content[key];

        // Si la propiedad es un archivo, agregarlo al FormData
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
      //   for (const [clave, valor] of formData.entries()) {
      //     console.log(`${clave}: ${valor}`);
      //   }
      //   return;

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
      console.log({ info });

      if (info === undefined || !info.ok) {
        console.log({ info });
        alertErrorTickets();
        setIsLoading(false);
        return;
      }

      const { data } = await info.json();
      // console.log({ data });
      const numberTicket = data?.ticketNumber;
      alertSuccessTickets(numberTicket);
    } catch (error) {
      console.log({ error });
    } finally {
      setIsLoading(false);
      reset();
      resetStep();
      router.push("/");
    }
  };

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
                  Se ha encontrado actividad sospechosa, complete el recaptcha
                  por favor
                </span>
              )}
            </div>
          </div>
        )}
      <div className="justify-center flex pb-10">
        <BotonEnviar
          loadingCheckHaveTickets={loadingCheckHaveTickets}
          isLoading={isLoading}
        />
      </div>
    </form>
  );
};
