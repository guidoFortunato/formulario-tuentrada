import {
  createForm,
  getDataCache,
  getDataTickets,
  sendDataEmail,
} from "@/helpers/getInfoTest";

import { getToken } from "./getToken";

export const getData = async (url, timeRevalidate = 60) => {
  // Obtener el token
  let token = await getToken();

  // Hacer la solicitud a la API con el token
  const res = await getDataCache(url, token, timeRevalidate);

  // Verificar si la respuesta es válida
  if (!res.status) {
    // console.error({res})
    return {
      status: false,
      message: res.message ?? "Error de autenticación",
    };
  }

  return { status: true, res, token };
};

export const sendData = async (url, email) => {
  // Obtener el token
  let token = await getToken();

  // Hacer la solicitud a la API con el token
  const res = await sendDataEmail(url, token, email);

  // Verificar si la respuesta es válida
  if (!res.status) {
    return {
      status: false,
      message: res.message ?? "Error de autenticación",
    };
  }

  return { status: true, res };
};

export const getTickets = async (url, email, itilcategoriesId) => {
  // Obtener el token
  let token = await getToken();

  // Hacer la solicitud a la API con el token
  const res = await getDataTickets(url, token, email, itilcategoriesId);

  // Verificar si la respuesta es válida
  if (!res.status) {
    // console.error({res})
    return {
      status: false,
      message: res.message ?? "Error de autenticación",
    };
  }

  return { status: true, res };
};

export const createTicket = async (url, formData) => {
  // Obtener el token
  let token = await getToken();
  // console.log({ formData });

  // Hacer la solicitud a la API con el token
  const res = await createForm(url, token, formData);
  // console.log({ resCreateTicket: res });

  // Verificar si la respuesta es válida
  if (!res.status) {
    // console.error({res})
    return {
      status: false,
      message: res.message ?? "Error de autenticación",
    };
  }

  return { status: true, res };
};
