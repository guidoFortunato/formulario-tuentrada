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
export const alertErrorTickets2 = () => {
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

export const alertErrorTickets = (text = "") => {
  Swal.fire({
    icon: "error",
    html: ` <div style="flex flex-col">
    <div class="mb-5">
      <p style="font-size: 25px; font-weight: bold;" class="mb-2">Ocurrió un error inesperado</p>
      <small style="font-size: 80%; color:#6C6C6C">Por favor, complete el siguiente formulario mientras solucionamos el inconveniente.</small>
    </div>
    <div>
      <a href="https://forms.gle/bu8Hx1NdGGDpLWQX6">
        <button class="btn-primary">Completar el formulario</button>
      </a>
    </div>
 
     </div>`,
    allowOutsideClick: false,
    confirmButtonColor: "#1955A5",
    iconColor: "#FC4242",
    showCloseButton: true,
    showConfirmButton: false,
    inputAutoFocus: false,
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
    confirmButtonText: "Aceptar",
    showCloseButton: true,
    inputAutoFocus: false,
    focusConfirm: false,
    focusCancel: false,
    focusDeny: false,
    returnFocus: false,
  });
};

export const alertErrorTicketsNotification = ( text = "Por favor, intente nuevamente en unos minutos." ) => {
  Swal.fire({
    icon: "error",
    html: ` 
    <div style="flex flex-col">    
      <p style="font-size: 25px; font-weight: bold;" class="mb-1">Ocurrió un error inesperado</p>
      <small style="font-size: 80%; color:#6C6C6C">${text}</small>    
     </div>`,
    allowOutsideClick: false,
    confirmButtonColor: "#1955A5",
    confirmButtonText: "Aceptar",
    iconColor: "#FC4242",
    showCloseButton: true,
  });
};

export const alertSuccessRenaper = ( title = "Solicitud en Proceso", message = "Su solicitud se encuentra en proceso", ticket = "10548" ) => {
  Swal.fire({
    icon: "success",
    iconColor: "#6bbf59",
    allowOutsideClick: false,
    html: ` <div style="text-align: center;">
        <b> <span style="font-size: 25px; font-weight: bold;">${ title }</span><br></b><br>
        <span style="font-size: 16px; font-weight: bold;">Tu número de ticket es: <span style="color: #6bbf59; font-size: 16px; font-weight:bold">${ticket}</span> </span><br><br>  
        <small style="font-size: 80%; color:#6C6C6C">${ message }</small> </div>`,

    confirmButtonColor: "#1955A5",
    confirmButtonText: "Aceptar",
    showCloseButton: true,
    inputAutoFocus: false,
    focusConfirm: false,
    focusCancel: false,
    focusDeny: false,
    returnFocus: false,
  });
};

export const alertErrorRenaper = ( title = "Ocurrió un error inesperado", message = "Por favor, intente nuevamente mas tarde" ) => {
  Swal.fire({
    icon: "error",
    html: ` 
    <div style="flex flex-col">    
      <p style="font-size: 25px; font-weight: bold;" class="mb-1">${title}</p>
      <small style="font-size: 80%; color:#6C6C6C">${message}</small>    
     </div>`,
    allowOutsideClick: false,
    confirmButtonColor: "#1955A5",
    confirmButtonText: "Aceptar",
    iconColor: "#FC4242",
    showCloseButton: true,
  });
};

export const alertErrorRenaperGeneral = () => {
  Swal.fire({
    icon: "error",
    html: ` 
    <div style="flex flex-col">    
      <p style="font-size: 25px; font-weight: bold;" class="mb-1">Ocurrió un error inesperado</p>
      <small style="font-size: 80%; color:#6C6C6C">Por favor, intente nuevamente mas tarde</small>    
     </div>`,
    allowOutsideClick: false,
    confirmButtonColor: "#1955A5",
    confirmButtonText: "Aceptar",
    iconColor: "#FC4242",
    showCloseButton: true,
  });
};


