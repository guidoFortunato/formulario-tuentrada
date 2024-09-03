export const addPrefixes = (key, value) => {
  if (typeof value === "string" || Array.isArray(value)) {
    return "info_" + key;
  } else if (typeof value === "object" && value instanceof FileList) {
    return "file_" + key;
  }
  return key;
};

export const addPrefixesRenaper = (key, value) => {
  // Convertir el valor a string en minúsculas para evitar problemas de mayúsculas/minúsculas
  const keyStr = key.toString().toLowerCase();

  // Switch basado en el valor del campo
  switch (true) {
    case /apellido/.test(keyStr):
      return "info_last_name";
    case /dni/.test(keyStr):
      return "info_dni";
    case /fecha.*nacimiento/.test(keyStr):
      return "info_birthdate";
    case /g[eé]nero/.test(keyStr):
      return "info_sexo";
    case /nombre/.test(keyStr):
      return "info_first_name";
    case /tr[aá]mite/.test(keyStr):
      return "id_tramite";
    case /acepto|pol[ií]tica|privacidad/.test(keyStr):
      return "info_accept_terms";
    // Aquí puedes añadir más casos según sea necesario
    default:
      // Reglas originales si no coincide con ningún caso
      if (typeof value === "string" || Array.isArray(value)) {
        return "info_" + key;
      } else if (typeof value === "object" && value instanceof FileList) {
        return "file_" + key;
      }
      return key;
  }
};
