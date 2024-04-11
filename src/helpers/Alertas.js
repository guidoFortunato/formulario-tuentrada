import Swal from "sweetalert2";

//Alerta buscador del formbusqueda
export const alertWarning = (text = "Debe ingresar un texto") => {
  Swal.fire({
    icon: "warning",
    html: `<b>${text}</b>`,
    timer: 3000,
    confirmButtonColor: "#1955A5",
    iconColor: "#F78408",
  });
};

//Alerta del envío de formapi
export const alertErrorTickets = () => {
  Swal.fire({
    icon: "error",
    html: ` <div style="text-align: center;"> 
   <span style="font-size: 25px; font-weight: bold;">No se pudo tomar el reclamo </span> <br><br>  
    <small style="font-size: 80%; color:#6C6C6C">Por favor vuelva a intentar en unos minutos </small>
 
     </div>`,
    allowOutsideClick: false,
    confirmButtonColor: "#1955A5",
    iconColor: "#FC4242",
  });
};

export const alertWarningTickets = (
  numberTicket = "",
  dateCreated = "",
  status = "",
  message = ""
) => {
  Swal.fire({
    icon: "warning",
    iconColor: "#F78408",
    allowOutsideClick: false,
    html: ` <div style="text-align: center;"> 
        <b> <span style="font-size: 25px; font-weight: bold;">${status} </span> <br></b><br><span style="font-size: 16px; font-weight: bold;">Tu número de ticket es: <span style="color: #F78408; font-size: 16px; font-weight:bold ">  ${numberTicket}</span> </span><br><br>  
        <small style="font-size: 80%; color:#6C6C6C">Tu consulta fue creada el día: ${dateCreated} <br> ${message}</small><br><br>
     
         </div>`,

    confirmButtonColor: "#1955A5",
  });
};

export const alertSuccessTickets = (numberTicket = "") => {
  Swal.fire({
    icon: "success",
    iconColor: "#6bbf59",
    allowOutsideClick: false,
    html: ` <div style="text-align: center;">
        <b> <span style="font-size: 25px; font-weight: bold;">Gracias por contactarte</span><br></b><br>
        <span style="font-size: 16px; font-weight: bold;">Tu número de ticket es: <span style="color: #6bbf59; font-size: 16px; font-weight:bold ">  ${numberTicket}</span> </span><br><br>  
        <small style="font-size: 80%; color:#6C6C6C">La copia de la información que completaste te llegará por correo electrónico. Revisá la carpeta de spam en caso de no verlo en tu bandeja de entrada.</small> </div>`,

    confirmButtonColor: "#1955A5",
  });
};
