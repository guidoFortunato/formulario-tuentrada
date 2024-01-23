import { Fragment, useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { createForm, getDataTickets } from "@/helpers/getInfoTest";
import { FormContext } from "@/context/FormContext";
import {
  alertPruebaTickets,
  alertSuccessTickets,
  alertTickets,
  alertaWarningTickets,
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
          console.log({ stepNow });
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
        // tickets abiertos
        if (info?.data?.tickets?.length > 0) {
          // const haveCloseForm = info?.data?.tickets.some((ticket) => ticket.closeForm === 1);
          const ticketsCloseForm = info.data.tickets.filter(
            (ticket) => ticket.closeForm === 1
          );
          if (ticketsCloseForm.length > 0) {
            console.log({ ticketsCloseForm });
            // const ticketNew = ticketsCloseForm.sort(
            //   (a, b) => new Date(b.dateCreated) - new Date(a.dateCreated)
            // )[0];

            //! falta validar si tiene tickets abiertos

            const ticketNumber = ticketsCloseForm[0].number;
            const status = ticketsCloseForm[0].status;
            const message = ticketsCloseForm[0].message;
            const fecha =
              new Date(ticketsCloseForm[0].dateCreated)
                .toLocaleDateString()
                .split("/")[0] +
              "/" +
              new Date(ticketsCloseForm[0].dateCreated)
                .toLocaleDateString()
                .split("/")[1] +
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
            console.log({ fecha });
            const date = `${fecha} - ${time1}:${time2} hs`;
            // console.log({ time1, time2, date });
            alertTickets(ticketNumber, date, status, message);
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
      //Form final
      let id;

      // Modificar las claves del objeto
      const objectModified = {};

      // Crear un nuevo FormData
      const formData = new FormData();

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

        // agregar prefijos
        Object.keys(content).forEach((key) => {
          const newKey = addPrefixes(key, content[key]);
          objectModified[newKey] = content[key];
        });

        // Agregar cada propiedad al FormData
        Object.keys(objectModified).forEach((key) => {
          // Si la propiedad es un archivo, agregarlo al FormData
          if (objectModified[key] instanceof FileList) {
            formData.append(key, objectModified[key][0]);
          } else {
            // Si no es un archivo, agregar el valor normalmente
            formData.append(key, objectModified[key]);
          }
        });
        formData.append("email", email);
        formData.append("name", `${category} - ${subCategory}`);

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
        console.log(await info.json());


        if (info === undefined) {
          alertaWarningTickets();
          // alertTickets(
          //   "111",
          //   "18/01/2024",
          //   "pendiente de respuesta del operador"
          // );
          setFinalLoading(false);
          return;
        }

        if (!info.status) {
          alertaWarningTickets();
          // alertTickets(
          //   "28434",
          //   "18/01/2024",
          //   "Pendiente de respuesta del operador"
          // );
          // alertSuccessTickets("28434");
          // reset();
          // resetStep();
          // router.push("/");
          setFinalLoading(false);
          return;
        }
        const numberTicket = info.data?.ticketNumber;
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
