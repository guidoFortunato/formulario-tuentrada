import { Fragment, useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { getDataTickets } from "@/helpers/getInfoTest";
import { FormContext } from "@/context/FormContext";
import { alertSuccessTickets, alertWarningTickets, alertErrorTickets } from "@/helpers/Alertas";
import { addPrefixes } from "@/utils/addPrefixes";
import { BotonEnviar } from "./BotonEnviar";
import { TypeFormCheckbox, TypeFormFile, TypeFormGlpi, TypeFormInput, TypeFormRadio, TypeFormSelect, TypeFormTextarea } from "../typeform";

export const FormsApiVerificacion = ({ dataForm, params }) => {
  const { handleSubmit, reset, token } = useContext(FormContext);
  const router = useRouter();
  const [loadingCheckHaveTickets, setLoadingCheckHaveTickets] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

//   console.log({dataForm})

  const renderForms = dataForm.steps[0].fields.map((item) => {
    console.log({item})
    if (item.type === "input") {
      return (
        <Fragment key={item.name}>
          <TypeFormInput item={item} />
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

  const onSubmit = async (data, event) => {
    event.preventDefault();
    console.log({ data });
    const { email, emailConfirm, ...content } = data;

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
        // console.log({ infoGetDataTickets: info });
        // tickets abiertos
        if (info?.data?.tickets?.length > 0) {
          // const haveCloseForm = info?.data?.tickets.some((ticket) => ticket.closeForm === 1);
          const ticketsCloseForm = info.data.tickets.filter(
            (ticket) => ticket.closeForm === 1
          );
          if (ticketsCloseForm.length > 0) {
            // console.log({ ticketsCloseForm });

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

    console.log({ dataFormsDniTarjeta: data });
    return;
    // alertSuccessTickets("123456");
    //  alertWarningTickets("123456", "12/02/2024", "En proceso de devolución","Por favor no envíes otro ticket",);
    // alertErrorTickets()
    // return;

    //Form final
    let id;

    // Crear un nuevo FormData
    const formData = new FormData();
    formData.append("email", email);
    formData.append("name", `Verificación datos - ${params.datos}`);

    try {
      setIsLoading(true);

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
        setIsLoading(false);
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
      setIsLoading(false);
      // router.push("/");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-10">
      <div className="grid gap-4 mb-4 sm:grid-cols-2">{renderForms}</div>
      <div className="justify-center flex pb-10">
        <BotonEnviar
          loadingCheckHaveTickets={loadingCheckHaveTickets}
          isLoading={isLoading}
        />
      </div>
    </form>
  );
};
