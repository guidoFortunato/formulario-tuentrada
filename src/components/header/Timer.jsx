import { useEffect, useState } from "react";

export const Timer = () => {
  const [time, setTime] = useState(60); // Tiempo en segundos
  // Calcular minutos y segundos
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;


  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(intervalId);
  }, []);


  return `Ha realizado demasiados intentos, intente nuevamente en: ${minutes}:${seconds < 10 ? `0${seconds}` : seconds} `
};
