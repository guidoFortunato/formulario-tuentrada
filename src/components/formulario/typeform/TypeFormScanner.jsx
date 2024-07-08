import { useContext, useEffect, useRef, useState } from "react";
import { FormContext } from "@/context/FormContext";
import Webcam from "react-webcam";
import clsx from "clsx";
import Modal from "react-modal";
import { Loader } from "@/components/loading";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    borderRadius: "8px",
    padding: "20px",
    width: "90%",
    maxWidth: "600px",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
};

export const TypeFormScanner = ({ item }) => {
  const { register, errors } = useContext(FormContext);
  const name = item.name.toLowerCase().split(" ").join("_");
  const webcamRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [facingMode, setFacingMode] = useState("environment");
  const [cameraError, setCameraError] = useState(false);
  const [validationAttempts, setValidationAttempts] = useState(0);
  const [validationError, setValidationError] = useState(false);
  const [dniValidated, setDniValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   Modal.setAppElement('#root'); // Ajusta este selector según el elemento principal de tu aplicación
  // }, []);

  // Definir isDNI fuera del retorno del componente
  const isDNI = item.name.toLowerCase().includes("dni");
  const isTarjeta = item.name.toLowerCase().includes("tarjeta");

  const capturePhoto = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImageSrc(imageSrc);
  };

  const openModal = () => {
    setIsModalOpen(true);
    setImageSrc(null);
    setCameraError(false);
    setValidationAttempts(0);
    setValidationError(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setValidationAttempts(0);
    setValidationError(false);
  };

  const handleAcceptPhoto = async () => {
    // Aquí puedes agregar la lógica para validar el DNI/Tarjeta
    // Simulando una llamada a una API (reemplaza con tu lógica real)
    try {
      setIsLoading(true);
      console.log({ isLoading });
      const apiResponse = await validarDocumento(imageSrc, isDNI); // Función simulada de validación
      const isValid = apiResponse.validado;

      if (isValid) {
        // setImageSrc(imageSrc);
        setDniValidated(true);
        setIsModalOpen(false);
      } else {
        setDniValidated(false);
        setValidationAttempts((prev) => prev + 1);
        if (validationAttempts >= 2) {
          setValidationError(true);
        }
      }
    } catch (error) {
      console.error("Error al validar documento:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const validarDocumento = async (imageSrc, isDNI) => {
    // Simulación de llamada a API de validación
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const validado = Math.random() < 0.8; // Simulación de resultado de validación
        resolve({ validado });
      }, 3000);
    });
  };

  return (
    <div className={item.subtype === "hidden" ? "hidden" : ""}>
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {item.name}{" "}
        {item.required === 1 && <span className="text-red-500 ml-1">*</span>}
      </label>

      <button
        className={clsx(
          "bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full py-6",
          {
            "border-red-500 focus:ring-red-300 focus:border-red-500":
              errors[name],
            "border-gray-300 focus:ring-blue-300 focus:border-blue-dark":
              !errors[name],
          }
        )}
        onClick={openModal}
        name={name}
        id={name}
        type="button"
        disabled={dniValidated}
      >
        {isDNI && (
          <>
            Adjunta el frente de tu DNI, tal como se muestra en la imagen:
            <div className="flex justify-center">
              <img
                className="w-[350px]"
                src="https://tuentrada.com/experiencia/ayuda-consulta/dni.png"
                alt="DNI"
              />
            </div>
          </>
        )}
        {!isDNI && (
          <>
            Adjunta el frente de tu Tarjeta, tal como se muestra en la imagen:
            <div className="flex justify-center">
              <img
                className="w-[350px]"
                src="https://tuentrada.com/experiencia/ayuda-consulta/tarjeta.png"
                alt="Tarjeta"
              />
            </div>
          </>
        )}
        {dniValidated ? (
          <div className="mt-2">
            <span
              className={clsx("whitespace-nowrap", {
                "btn-primary": !dniValidated,
                "btn-disabled": dniValidated,
              })}
            >
              {isDNI ? "✔️ DNI validado" : "Tarjeta cargada"}
            </span>
          </div>
        ) : (
          <div className="mt-2">
            <span className="whitespace-nowrap btn-primary">
              Activar Cámara
            </span>
          </div>
        )}
      </button>

      {item.helperText && !errors[name] && (
        <span className="text-gray-500 text-xs block mt-1">
          {item.helperText}
        </span>
      )}
      {errors[name] && (
        <span className="text-red-600 text-xs block mt-1">
          {errors[name].message}
        </span>
      )}

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Modal de Cámara"
        style={customStyles}
      >
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-gray-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path fill="currentColor" d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
        {cameraError ? (
          <div className="text-red-600 text-xs flex justify-center items-center">
            <svg
              className="mr-1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              width="16px"
              height="16px"
            >
              <path
                fill="#f44336"
                d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"
              />
              <path
                fill="#fff"
                d="M29.656,15.516l2.828,2.828l-14.14,14.14l-2.828-2.828L29.656,15.516z"
              />
              <path
                fill="#fff"
                d="M32.484,29.656l-2.828,2.828l-14.14-14.14l2.828-2.828L32.484,29.656z"
              />
            </svg>{" "}
            <span>
              Debe acceder a los permisos de la cámara para poder escanear su
              DNI.
            </span>
          </div>
        ) : (
          <>
            {imageSrc ? (
              <div className="flex justify-center mt-4">
                <img
                  src={imageSrc}
                  alt="Captura"
                  className="rounded-lg"
                  style={{ maxWidth: "100%", maxHeight: "300px" }}
                />
              </div>
            ) : (
              <Webcam
                className="rounded-lg"
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={{ facingMode: facingMode }}
                onUserMediaError={() => setCameraError(true)}
              />
            )}
            <div className="mt-4">
              {imageSrc ? (
                <div className="flex justify-evenly items-center">
                  <button
                    className="w-12"
                    type="button"
                    onClick={handleAcceptPhoto}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <img
                        src="https://www.tuentrada.com/experiencia/ayuda-consulta/12.gif"
                        alt="gift"
                      />
                    ) : (
                      <img
                        src="https://tuentrada.com/experiencia/ayuda-consulta/11.svg"
                        alt="Validar Modal"
                      />
                    )}
                  </button>
                  <button
                    className={clsx(
                      "w-12 ml-2",
                      {
                        "hidden": isLoading
                      }
                    )}
                    type="button"
                    onClick={closeModal}
                    disabled={isLoading}
                  >
                    <img
                      src="https://tuentrada.com/experiencia/ayuda-consulta/9.svg"
                      alt="Cerrar Modal"
                    />
                  </button>
                </div>
              ) : (
                <div className="flex justify-evenly items-center mt-4">
                  <button
                    className="w-12"
                    type="button"
                    onClick={() =>
                      setFacingMode((prev) =>
                        prev === "user" ? "environment" : "user"
                      )
                    }
                  >
                    <img
                      src="https://tuentrada.com/experiencia/ayuda-consulta/8.svg"
                      alt="Cambiar cámara"
                    />
                  </button>
                  <button className="w-12" type="button" onClick={capturePhoto}>
                    <img
                      src="https://tuentrada.com/experiencia/ayuda-consulta/7.svg"
                      alt="Capturar foto"
                    />
                  </button>
                  <button className="w-12" type="button" onClick={closeModal}>
                    <img
                      src="https://tuentrada.com/experiencia/ayuda-consulta/9.svg"
                      alt="Cerrar modal"
                    />
                  </button>
                </div>
              )}
            </div>
            {validationError && (
              <div className="text-red-600 text-xs mt-2">
                El {isDNI && "DNI"} no fue validado por Renaper. Se mandó a
                validar a nuestro centro de atención al cliente.
              </div>
            )}
          </>
        )}
      </Modal>

      <div className="py-2">
        <span className="text-sm text-gray-700">
          Si estás utilizando una computadora o no tienes cámara, genera el
          código QR y escanéalo desde tu celular para realizar el trámite:
        </span>
        <span className="underline text-blue-dark cursor-pointer hover:text-blue-800">
          Generar QR
        </span>
      </div>
    </div>
  );
};
