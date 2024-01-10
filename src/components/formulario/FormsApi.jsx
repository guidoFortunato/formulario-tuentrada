import { useContext, useState } from "react";
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
    resetStep
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
      // console.log({currentStep, index})
      if (currentStep === index + 2) {
        return item.fields.map((itemField, index) => {
          // console.log({itemField})
          if (itemField.type === "input") {
            return <TypeFormInput item={itemField} key={index} />;
          }
          if (itemField.type === "textArea") {
            return <TypeFormTextarea item={itemField} key={index} />;
          }
          if (itemField.type === "file") {
            return <TypeFormFile item={itemField} key={index} />;
          }
          if (itemField.type === "select") {
            return <TypeFormSelect item={itemField} key={index} />;
          }
          if (itemField.type === "subCategoryGlpi") {
            return <TypeFormGlpi item={itemField} key={index} />;
          }
          if (itemField.type === "radio") {
            return <TypeFormRadio item={itemField} key={index} />;
          }
          if (itemField.type === "checkbox") {
            return <TypeFormCheckbox item={itemField} key={index} />;
          }
        });
      }
    });

  const onSubmit = async (data, event) => {
    event.preventDefault();
    console.log({glpiSubCategory})

    const { name, email, emailConfirm, ...contentFinal } = data;
    // console.log({selectDefaultValue })

    if (selectDefaultValue === "defaultValue") {
      // console.log('entra a selectDefaultValue === "defaultValue"')
      handleErrorInput(true);
      return;
    }

    if (stepNow.checkHaveTickets === 1) {
      setLoadingCheckHaveTickets(true)
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
          const ticketsCloseForm = info.data.tickets.filter((ticket) => ticket.closeForm === 1);
          if (ticketsCloseForm > 0) {
            const ticketNew = ticketsCloseForm.sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated))[0];

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
            setLoadingCheckHaveTickets(false)
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
        );        // console.log({ infoGlpiSubCategoryId: info });

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
            setLoadingCheckHaveTickets(false)
            return;
          }
        }
      }
      setLoadingCheckHaveTickets(false)
    }

    if (!(currentStep + 1 === lengthSteps)) {
      nextStep();
    }

    if (currentStep + 1 === lengthSteps) {
      //Form final
      setFinalLoading(true)
      let numberTicket;

      const content = { ...contentFinal };

      if (glpiSubCategory === "" || glpiSubCategory === undefined) {
        // console.log({stepNow})
        const { categoryId } = stepNow;
        const itilcategoriesId = Object.keys(categoryId)[0];

        const info = await createForm(
          `https://${process.env.NEXT_PUBLIC_API}/api/v1/atencion-cliente/create/form`,
          token,
          "Prueba Formulario",
          email,
          content,
          itilcategoriesId
        );
        console.log({ info });
        if (info === undefined) {
          alertaWarningTickets();
          setFinalLoading(false)
          return;
        }

        if (!info.status) {
          alertaWarningTickets();
          reset();
          resetStep();
          router.push("/");
          setFinalLoading(false)
          return;
        }
        numberTicket = info?.data?.ticketNumber;
        alertSuccessTickets(numberTicket);
        // console.log({ infoFinal: info });
      }

      if (glpiSubCategory !== "" && glpiSubCategory !== undefined) {
        const info = await createForm(
          `https://${process.env.NEXT_PUBLIC_API}/api/v1/atencion-cliente/create/form`,
          token,
          "Prueba Formulario",
          email,
          content,
          glpiSubCategory.id
        );
        // console.log({ infoGlpiSubCategory: info });
        if (info === undefined) {
          alertaWarningTickets();
          setFinalLoading(false)
          return;
        }

        if (!info.status) {
          // console.log({ infoFinal: info });
          alertaWarningTickets();
          reset();
          resetStep();
          router.push("/");
          setFinalLoading(false)
          return;
        }
        numberTicket = info?.data?.ticketNumber;
        alertSuccessTickets(numberTicket);
        // console.log({ infoFinal: info });
      }
      resetStep();
      reset();
      router.push("/");
      setFinalLoading(false)
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-10">
      <div className="grid gap-4 mb-4 sm:grid-cols-2">{renderForms}</div>
      <div className="justify-center flex pb-10">
        <BotonVolver />
        <BotonSiguiente lengthSteps={lengthSteps} finalLoading={finalLoading} loadingCheckHaveTickets={loadingCheckHaveTickets} />
      </div>
    </form>
  );
};
