import Swal from "sweetalert2";

export const alertaWarning = (text = "Debe ingresar un texto") => {
  Swal.fire({
    icon: "warning",
    html: `<b>${text}</b>`,
    timer: 2000,
    confirmButtonColor: "#444444", // dataInfoGeneral.backgroundButton
    iconColor: "#F7AC08",
  });
};

export const alertaWarningTickets = (text = "No se pudo tomar el reclamo, intente nuevamente mas tarde") => {
  Swal.fire({
    icon: "error",
    html: `<b>${text}</b>`,
    allowOutsideClick: false,
    confirmButtonColor: "#444444", // dataInfoGeneral.backgroundButton
  });
};

export const alertTickets = (
  numberTicket = "",
  dateCreated="",
  status="",
  message="",
) => {
  Swal.fire({
    icon: "warning",
    iconColor: "#F78408",
    allowOutsideClick: false,
    html: ` <div style="text-align: center;"> 
        <b> <span style="font-size: 25px; font-weight: bold;">${status} </span><br><br><span style="font-size: 22px; font-weight: bold;">Número de reclamo: </span> <span style="font-size: 22px; color: #F78408">${numberTicket} </span></span><br></b><br>
        <small style="font-size: 80%; color:#6C6C6C">Tu consulta fue creada el día: ${dateCreated} <br> ${message}</small><br><br>
     
         </div>`,
    // timer: 3000,
    confirmButtonColor: "#1955A5", // dataInfoGeneral.backgroundButton
    // iconColor: "#F7AC08",
  });
};


export const alertSuccessTickets = (
  numberTicket = "",
) => { 
  Swal.fire({
     icon: "success", 
     iconColor: "#6bbf59",
    allowOutsideClick: false,
    html: ` <div style="text-align: center;">
        <b> <span style="font-size: 25px; font-weight: bold;">Gracias por contactarte</span><br></b><br>
        <span style="font-size: 16px; font-weight: bold;">Tu número de ticket es: <span style="color: #6bbf59; font-size: 16px; font-weight:bold ">  ${numberTicket}</span> </span><br><br>  
        <small style="font-size: 80%; color:#6C6C6C">Toda la información te llegará por correo electrónico. Puede revisar la carpeta de spam en caso de no recibirlo.</small> </div>`,
    // timer: 3000,
    confirmButtonColor: "#1955A5", // dataInfoGeneral.backgroundButton
    // iconColor: "#F7AC08",
  });
};
export const alertPruebaTickets = (value) => {
  Swal.fire({
    icon: "success",
    allowOutsideClick: false,
    html: ` <div style="text-align: center;">
        <b>Gracias por contactarte<br></b><br>
        <span>Tu número de ticket es: <span style="color: #6bbf59;">Info:</span> </span><br><br>  

        <div style="font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;  margin: 0; padding: 0;">
        <div style="max-width: 600px; margin: 0 auto;">
          <div style="font-size: 18px; font-weight: bold; margin-bottom: 20px;">
            prueba
          </div>
  
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <tbody>
          <tr key={index}>
          ${value?.map((item, index) => (
            <>
              <th style="border: 1px solid #ddd; padding: 10px; background-color: #f2f2f2;">
               prueba
              </th>
              <td style="border: 1px solid #ddd; padding: 10px;">
             prueba
              </td>
                  </>
          ))}
          </tr>
          </tbody>
          </table>

        </div>
      </div>
        
        </div>`,
    // timer: 3000,
    confirmButtonColor: "#444444", // dataInfoGeneral.backgroundButton
    // iconColor: "#F7AC08",
  });
};

