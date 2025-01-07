import { useEffect, useState } from "react";

export const Timer = ({ timeDifference, onTimerEnd }) => {
  const [timeLeft, setTimeLeft] = useState(timeDifference);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimerEnd();
      return;
    }

    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft, onTimerEnd]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return `Demasiadas solicitudes, intente nuevamente en: ${minutes}:${
    seconds < 10 ? `0${seconds}` : seconds
  }`;
};
