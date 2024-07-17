import { useContext, useEffect, useRef, useState } from "react";
import { FormContext } from "@/context/FormContext";
import Webcam from "react-webcam";
import clsx from "clsx";
import Modal from "react-modal";
import { Loader } from "@/components/loading";
import { FaCheckCircle } from "react-icons/fa";
import { PiCircleFill } from "react-icons/pi";
import { MdChangeCircle } from "react-icons/md";
import { AiFillCloseCircle } from "react-icons/ai";
import QRCode from "qrcode";

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

const customStylesQR = {
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
    // width: "90%",
    maxWidth: "600px",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
};

export const TypeFormScanner = ({ item }) => {
  const { register, errors, setValue } = useContext(FormContext);
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
  const [modalQr, setModalQr] = useState(false);
  const [srcQR, setSrcQR] = useState(null);
  const [isValid, setIsValid] = useState(false);

  // console.log({item})

  // Definir isDNI fuera del retorno del componente
  const isDNI = item.name.toLowerCase().includes("dni");
  const isTarjeta = item.name.toLowerCase().includes("tarjeta");

  const capturePhoto = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImageSrc(imageSrc);
  };

  useEffect(() => {
    QRCode.toDataURL("https://ayuda.tuentrada.com").then(setSrcQR);
  }, []);

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

  const openModalQR = () => {
    setModalQr(true);
  };

  const closeModalQR = () => {
    setModalQr(false);
  };

  const handleAcceptPhoto = async (value) => {
    // Aquí puedes agregar la lógica para validar el DNI/Tarjeta
    // Simulando una llamada a una API (reemplaza con tu lógica real)

    try {
      // setIsLoading(true);
      // console.log({ isLoading });
      // console.log({ imageSrc });
      // const apiResponse = await validarDocumento(imageSrc, isDNI); // Función simulada de validación
      // const isValid = apiResponse.validado;


      if (value) {
        // console.log({ imageSrc });
        setDniValidated(true);
        setIsModalOpen(false);
        setValue(name, imageSrc);
      } else {
        setDniValidated(false);
        // setValidationAttempts((prev) => prev + 1);
        // if (validationAttempts >= 2) {
        //   setValidationError(true);
        // }
      }
    } catch (error) {
      console.error("Error al validar documento:", error);
    } finally {
      closeModal();
      // setIsLoading(false);
    }
  };

  // const validarDocumento = async (imageSrc, isDNI) => {
  //   // Simulación de llamada a API de validación
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       const validado = Math.random() < 0.8; // Simulación de resultado de validación
  //       resolve({ validado });
  //     }, 3000);
  //   });
  // };

  return isDNI && (
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
        {...register(name, { required: item.required === 1 })}
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
          <div className="mt-2 flex justify-center">
            <span
              className={clsx("whitespace-nowrap", {
                "btn-primary": !dniValidated,
                "btn-disabled": dniValidated,
              })}
            >
              {<FaCheckCircle className="text-emerald-600 text-3xl " />}
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
        appElement={document.getElementById("root")}
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
                    onClick={() => {
                      handleAcceptPhoto(true);
                    }}
                    disabled={isLoading}
                  >
                    {/* {isLoading ? (
                      <img
                        src="https://www.tuentrada.com/experiencia/ayuda-consulta/12.gif"
                        alt="gift"
                      />
                    ) : (
                      <FaCheckCircle className="text-emerald-600 text-3xl " />
                    )} */}
                    <FaCheckCircle className="text-emerald-600 text-3xl" />
                  </button>
                  <button
                    className="w-12 ml-2"
                    type="button"
                    onClick={() => {
                      handleAcceptPhoto(false);
                    }}
                    // disabled={isLoading}
                  >
                    <AiFillCloseCircle className="text-red-700 text-4xl" />
                  </button>
                </div>
              ) : (
                <div className="flex justify-evenly items-center mt-4">
                  <button
                    type="button"
                    onClick={() =>
                      setFacingMode((prev) =>
                        prev === "user" ? "environment" : "user"
                      )
                    }
                  >
                    <MdChangeCircle className="text-gray-400 text-4xl " />
                  </button>
                  <button
                    className=" border-2 border-white rounded-full"
                    type="button"
                    onClick={capturePhoto}
                  >
                    <PiCircleFill className="text-white text-4xl " />
                  </button>
                  <button type="button" onClick={closeModal}>
                    <AiFillCloseCircle className="text-red-700 text-4xl" />
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
      <Modal
        isOpen={modalQr}
        onRequestClose={closeModalQR}
        contentLabel="Modal de Qr"
        style={customStylesQR}
        appElement={document.getElementById("root")}
      >
        {srcQR && (
          <img
            src={srcQR}
            alt="QR"
            className="rounded-lg"
            style={{ maxWidth: "100%", maxHeight: "300px" }}
          />
        )}
      </Modal>

      <div className="py-2 hidden lg:block">
        <span className="text-sm text-gray-700 mr-1">
          Si estás utilizando una computadora o no tienes cámara, generá el
          código QR y escanéalo desde tu celular para realizar el trámite:
        </span>
        <button
          className="underline text-blue-dark cursor-pointer hover:text-blue-800"
          onClick={openModalQR}
        >
          Generar QR
        </button>
      </div>
    </div>
  );
};
