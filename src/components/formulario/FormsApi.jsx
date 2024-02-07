import { Fragment, useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { createForm, getDataTickets } from "@/helpers/getInfoTest";
import { FormContext } from "@/context/FormContext";
import {
  alertSuccessTickets,
  alertWarningTickets,
  alertErrorTickets,
} from "@/helpers/Alertas";
import {
  TypeFormCheckbox,
  TypeFormFile,
  TypeFormGlpi,
  TypeFormInput,
  TypeFormRadio,
  TypeFormSelect,
  TypeFormTextarea,
} from "./typeform";
import { BotonSiguiente } from "./BotonSiguiente";
import { BotonVolver } from "./BotonVolver";
import { addPrefixes } from "@/utils/addPrefixes";
import { formatDateString, isDateFormat } from "@/utils/helpDates";

export const FormsApi = ({ dataForm, lengthSteps, category, subCategory }) => {
  const {
    handleSubmit,
    nextStep,
    stepsEstaticos,
    currentStep,
    reset,
    glpiSubCategory,
    handleErrorInput,
    selectDefaultValue,
    token,
    resetStep,
  } = useContext(FormContext);

  const { steps } = dataForm;
  const newSteps = [...stepsEstaticos, ...steps];
  const router = useRouter();
  const stepNow = newSteps[currentStep];
  const [loadingCheckHaveTickets, setLoadingCheckHaveTickets] = useState(false);
  const [finalLoading, setFinalLoading] = useState(false);

  const renderForms =
    newSteps.length > 2 &&
    newSteps.slice(2).map((item, index) => {
      if (currentStep === index + 2) {
        return item.fields.map((itemField) => {
          if (itemField.type === "input") {
            return (
              <Fragment key={itemField.name}>
                <TypeFormInput item={itemField} />
              </Fragment>
            );
          }
          if (itemField.type === "textArea") {
            return (
              <Fragment key={itemField.name}>
                <TypeFormTextarea item={itemField} />
              </Fragment>
            );
          }
          if (itemField.type === "file") {
            return (
              <Fragment key={itemField.name}>
                <TypeFormFile item={itemField} />
              </Fragment>
            );
          }
          if (itemField.type === "select") {
            return (
              <Fragment key={itemField.name}>
                <TypeFormSelect item={itemField} />
              </Fragment>
            );
          }
          if (itemField.type === "subCategoryGlpi") {
            return (
              <Fragment key={itemField.name}>
                <TypeFormGlpi item={itemField} />
              </Fragment>
            );
          }
          if (itemField.type === "radio") {
            return (
              <Fragment key={itemField.name}>
                <TypeFormRadio item={itemField} />
              </Fragment>
            );
          }
          if (itemField.type === "checkbox") {
            return (
              <Fragment key={itemField.name}>
                <TypeFormCheckbox item={itemField} />
              </Fragment>
            );
          }
        });
      }
    });

  const onSubmit = async (data, event) => {
    event.preventDefault();
    console.log({data})
    const { email, emailConfirm, ...content } = data;

    if (selectDefaultValue === "defaultValue") {
      handleErrorInput(true);
      return;
    }

    if (stepNow.checkHaveTickets === 1) {
      let id;

      try {
        setLoadingCheckHaveTickets(true);
        if (glpiSubCategory === "" || glpiSubCategory === undefined) {
          const { categoryId } = stepNow;
          // console.log({ stepNow });
          id = Object.keys(categoryId)[0];
        }

        if (glpiSubCategory !== "" && glpiSubCategory !== undefined) {
          id = glpiSubCategory.id;
        }
        const info = await getDataTickets(
          `https://${process.env.NEXT_PUBLIC_API}/api/v1/atencion-cliente/search/tickets`,
          token,
          email,
          id
        );
        console.log({ infoGetDataTickets: info });
        // tickets abiertos
        if (info?.data?.tickets?.length > 0) {
          // const haveCloseForm = info?.data?.tickets.some((ticket) => ticket.closeForm === 1);
          const ticketsCloseForm = info.data.tickets.filter(
            (ticket) => ticket.closeForm === 1
          );
          if (ticketsCloseForm.length > 0) {
            console.log({ ticketsCloseForm });

            const ticketNumber = ticketsCloseForm[0].number;
            const status = ticketsCloseForm[0].status;
            const message = ticketsCloseForm[0].message;

            const fecha =
              new Date(ticketsCloseForm[0].dateCreated)
                .toLocaleDateString()
                .split("/")[1] +
              "/" +
              new Date(ticketsCloseForm[0].dateCreated)
                .toLocaleDateString()
                .split("/")[0] +
              "/" +
              new Date(ticketsCloseForm[0].dateCreated)
                .toLocaleDateString()
                .split("/")[2];
            const time1 = new Date(ticketsCloseForm[0].dateCreated)
              .toLocaleTimeString()
              .split(" ")[0]
              .split(":")[0];
            const time2 = new Date(ticketsCloseForm[0].dateCreated)
              .toLocaleTimeString()
              .split(" ")[0]
              .split(":")[1];
            // console.log({ fecha });
            const date = `${fecha} - ${time1}:${time2} hs`;
            // console.log({ time1, time2, date });
            alertWarningTickets(ticketNumber, date, status, message);
            // reset();
            // resetStep();
            // router.push("/");
            setLoadingCheckHaveTickets(false);
            return;
          }
        }
      } catch (error) {
        console.log({ error });
      } finally {
        setLoadingCheckHaveTickets(false);
      }
    }

    if (!(currentStep + 1 === lengthSteps)) {
      nextStep();
    }

    if (currentStep + 1 === lengthSteps) {
      alertSuccessTickets("123456");
      //  alertWarningTickets("123456", "12/02/2024", "En proceso de devolución","Por favor no envíes otro ticket",);
      // alertErrorTickets()
      return;

      //Form final
      let id;

      // Crear un nuevo FormData
      const formData = new FormData();
      formData.append("email", email);
      formData.append("name", `${category} - ${subCategory}`);

      try {
        setFinalLoading(true);

        if (glpiSubCategory === "" || glpiSubCategory === undefined) {
          const { categoryId } = stepNow;
          // console.log({ stepNow });
          id = Object.keys(categoryId)[0];
          itilcategoriesId;
          formData.append("itilcategoriesId", id);
        }

        if (glpiSubCategory !== "" && glpiSubCategory !== undefined) {
          id = glpiSubCategory.id;
          formData.append("itilcategoriesId", id);
        }

        // Agregar cada propiedad al FormData
        Object.keys(content).forEach((key) => {
          const newKey = addPrefixes(key, content[key]);

          // Verificar si el valor es una fecha y formatearlo
          const formattedValue = isDateFormat(content[key])
            ? formatDateString(content[key])
            : content[key];

          // Si la propiedad es un archivo, agregarlo al FormData
          if (content[key] instanceof FileList) {
            if (content[key].length > 0) {
              formData.append(newKey, content[key][0]);
            }
          } else {
            // Si no es un archivo, agregar el valor normalmente
            formData.append(newKey, formattedValue);
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

        if (info === undefined || !info.ok) {
          alertErrorTickets();
          setFinalLoading(false);
          return;
        }

        const { data } = await info.json();
        const numberTicket = data?.ticketNumber;
        alertSuccessTickets(numberTicket);
      } catch (error) {
        console.log({ error });
      } finally {
        // reset();
        // resetStep();
        setFinalLoading(false);
        // router.push("/");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-10">
      <div className="grid gap-4 mb-4 sm:grid-cols-2">{renderForms}</div>
      <div className="justify-center flex pb-10">
        <BotonVolver />
        <BotonSiguiente
          lengthSteps={lengthSteps}
          finalLoading={finalLoading}
          loadingCheckHaveTickets={loadingCheckHaveTickets}
        />
      </div>
    </form>
  );
};
