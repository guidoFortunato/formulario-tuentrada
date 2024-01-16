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
          // console.log({itemField})
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
      setLoadingCheckHaveTickets(true);
      if (glpiSubCategory === "" || glpiSubCategory === undefined) {
        const { categoryId } = stepNow;
        const keyCategory = Object.keys(categoryId)[0];
        const info = await getDataTickets(
          `https://${process.env.NEXT_PUBLIC_API}/api/v1/atencion-cliente/search/tickets`,
          token,
          data.email,
          keyCategory
        );
        // console.log({ infoCategoryId: info });
        if (info?.data?.tickets?.length > 0) {
          // const haveCloseForm = info?.data?.tickets.some((ticket) => ticket.closeForm === 1);
          const ticketsCloseForm = info.data.tickets.filter(
            (ticket) => ticket.closeForm === 1
          );
          if (ticketsCloseForm.length > 0) {
            console.log({ ticketsCloseForm });
            const ticketNew = ticketsCloseForm.sort(
              (a, b) => new Date(b.dateCreated) - new Date(a.dateCreated)
            )[0];

            //! falta validar si tiene tickets abiertos

            const ticketNumber = info?.data?.tickets[0].number;
            const status = info?.data?.tickets[0].status;
            const fecha =
              new Date(info?.data?.tickets[0].dateCreated)
                .toLocaleDateString()
                .split("/")[1] +
              "/" +
              new Date(info?.data?.tickets[0].dateCreated)
                .toLocaleDateString()
                .split("/")[0] +
              "/" +
              new Date(info?.data?.tickets[0].dateCreated)
                .toLocaleDateString()
                .split("/")[2];
            const time1 = new Date(info?.data?.tickets[0].dateCreated)
              .toLocaleTimeString()
              .split(" ")[0]
              .split(":")[0];
            const time2 = new Date(info?.data?.tickets[0].dateCreated)
              .toLocaleTimeString()
              .split(" ")[0]
              .split(":")[1];
            const date = `${fecha} - ${time1}:${time2} hs`;
            // console.log({ time1, time2, date });
            alertTickets(ticketNumber, date, status);
            reset();
            resetStep();
            router.push("/");
            setLoadingCheckHaveTickets(false);
            return;
          }
        }
      }

      if (glpiSubCategory !== "" && glpiSubCategory !== undefined) {
        const info = await getDataTickets(
          `https://${process.env.NEXT_PUBLIC_API}/api/v1/atencion-cliente/search/tickets`,
          token,
          data.email,
          glpiSubCategory.id
        );
        console.log({ infoGlpiSubCategoryId: info });

        if (info?.data?.tickets?.length > 0) {
          if (info?.data?.tickets[0].closeForm) {
            const ticketNumber = info?.data?.tickets[0].number;
            const status = info?.data?.tickets[0].status;
            const fecha =
              new Date(info?.data?.tickets[0].dateCreated)
                .toLocaleDateString()
                .split("/")[1] +
              "/" +
              new Date(info?.data?.tickets[0].dateCreated)
                .toLocaleDateString()
                .split("/")[0] +
              "/" +
              new Date(info?.data?.tickets[0].dateCreated)
                .toLocaleDateString()
                .split("/")[2];
            const time1 = new Date(info?.data?.tickets[0].dateCreated)
              .toLocaleTimeString()
              .split(" ")[0]
              .split(":")[0];
            const time2 = new Date(info?.data?.tickets[0].dateCreated)
              .toLocaleTimeString()
              .split(" ")[0]
              .split(":")[1];
            const date = `${fecha} - ${time1}:${time2} hs`;
            alertTickets(ticketNumber, date, status);
            reset();
            resetStep();
            router.push("/");
            setLoadingCheckHaveTickets(false);
            return;
          }
        }
      }
      setLoadingCheckHaveTickets(false);
    }

    if (!(currentStep + 1 === lengthSteps)) {
      nextStep();
    }

    if (currentStep + 1 === lengthSteps) {
      //Form final
      console.log({data})
      return
      setFinalLoading(true);
      let numberTicket;

      if (glpiSubCategory === "" || glpiSubCategory === undefined) {
        const { categoryId } = stepNow;
        const itilcategoriesId = Object.keys(categoryId)[0];

        const info = await createForm(
          `https://${process.env.NEXT_PUBLIC_API}/api/v1/atencion-cliente/create/form`,
          token,
          "Prueba Formulario",
          email,
          content,
          `${itilcategoriesId}`
        );

        if (info === undefined) {
          alertaWarningTickets();
          setFinalLoading(false);
          return;
        }

        if (!info.status) {
          alertaWarningTickets();
          reset();
          resetStep();
          router.push("/");
          setFinalLoading(false);
          return;
        }
        numberTicket = info?.data?.ticketNumber;
        alertSuccessTickets(numberTicket);
      }

      if (glpiSubCategory !== "" && glpiSubCategory !== undefined) {
        const itilcategoriesId = glpiSubCategory.id;
        const info = await createForm(
          `https://${process.env.NEXT_PUBLIC_API}/api/v1/atencion-cliente/create/form`,
          token,
          "Prueba Formulario",
          email,
          content,
          `${itilcategoriesId}`
        );
        console.log({ infoGlpiSubCategory: info });
        if (info === undefined) {
          alertaWarningTickets();
          setFinalLoading(false);
          return;
        }

        if (!info.status) {
          alertaWarningTickets();
          reset();
          resetStep();
          router.push("/");
          setFinalLoading(false);
          return;
        }
        numberTicket = info?.data?.ticketNumber;
        alertSuccessTickets(numberTicket);
      }
      resetStep();
      reset();
      router.push("/");
      setFinalLoading(false);
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
