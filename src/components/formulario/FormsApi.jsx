import { Fragment, useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { getDataTickets } from "@/helpers/getInfoTest";
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
  const categoryId = dataForm?.categoryId;
  const firstSubject = dataForm?.firstPartSubject;
  const secondSubject = dataForm?.secondPartSubject;
  const fields = steps.flatMap((item) => item.fields);
  // console.log({dataForm})

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
          if (
            itemField.type === "select" ||
            itemField.type === "subCategoryGlpi"
          ) {
            return (
              <Fragment key={itemField.name}>
                <TypeFormSelect item={itemField} />
              </Fragment>
            );
          }
          // if (itemField.type === "subCategoryGlpi") {
          //   return (
          //     <Fragment key={itemField.name}>
          //       <TypeFormGlpi item={itemField} />
          //     </Fragment>
          //   );
          // }
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
    // console.log({ data });
    // return;

    const { email, emailConfirm, ...content } = data;

    // if (selectDefaultValue === "defaultValue") {
    //   handleErrorInput(true);
    //   return;
    // }

    if (stepNow.checkHaveTickets === 1) {
      let id;

      try {
        setLoadingCheckHaveTickets(true);
        if (glpiSubCategory === "" || glpiSubCategory === undefined) {
          id = categoryId;
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
            console.log("tiene tickets sin cerrar", { ticketsCloseForm });
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

    if (!(currentStep + 1 === lengthSteps)) {
      nextStep();
    }

    if (currentStep + 1 === lengthSteps) {
      //Form final
      let id;
      const subject = [];

      secondSubject?.map((id) => {
        fields?.map((item) => {
          if (id === String(item.id)) {
            Object.keys(data).map((key) => {
              if (key === item.name) {
                subject.push(data[key]);
                return;
              }
            });
          }
        });
      });
      const finalSubject = subject.join(" - ");

      // Crear un nuevo FormData
      const formData = new FormData();
      formData.append("email", email);
      formData.append("name", `${firstSubject}: ${finalSubject}`);

      try {
        setFinalLoading(true);

        if (glpiSubCategory === "" || glpiSubCategory === undefined) {
          id = categoryId;
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
          // const formattedValue = isDateFormat(content[key])
          //   ? formatDateString(content[key])
          //   : content[key];

          // Si la propiedad es un archivo, agregarlo al FormData
          if (content[key] instanceof FileList) {
            if (content[key].length > 0) {
              formData.append(newKey, content[key][0]);
            }
          }
          // if (Array.isArray(content[key])) {
          //   formData.append(newKey, content[key].join(" - "));
          // }
          else {
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
        // console.log({ info });

        if (info === undefined || !info.ok) {
          alertErrorTickets();
          setFinalLoading(false);
          return;
        }
        const { data } = await info.json();
        // console.log({ data });
        const numberTicket = data?.ticketNumber;
        alertSuccessTickets(numberTicket);
      } catch (error) {
        console.log({ error });
      } finally {
        setFinalLoading(false);
        reset();
        resetStep();
        router.push("/");
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
