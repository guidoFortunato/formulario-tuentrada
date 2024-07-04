import { useContext, useRef, useState } from "react";
import { FormContext } from "@/context/FormContext";
import Webcam from "react-webcam";
import clsx from "clsx";

export const TypeFormScanner = ({ item }) => {
  const { register, errors } = useContext(FormContext);
  const name = item.name.toLowerCase().split(" ").join("_");
  const webcamRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [scan, setScan] = useState(false);
  const [facingMode, setFacingMode] = useState("environment");
  const [cameraError, setCameraError] = useState(false);

  function capturePhoto() {
    const imageSrc = webcamRef.current.getScreenshot();
    setImageSrc(imageSrc);
  }

  const handleScan = () => {
    setScan((prev) => !prev);
    if (scan) {
      setImageSrc(null);
      setCameraError(false);
    } 
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
            "border-red-500 focus:ring-red-300 focus:border-red-500": errors[name],
            "border-gray-300 focus:ring-blue-300 focus:border-blue-dark": !errors[name],
          }
        )}
        onClick={handleScan}
        name={name}
        id={name}
        type="button"
      >
        Adjunta el frente de tu DNI, tal como se muestra en la imagen:
        <div className="flex justify-center">
          <img className="w-[350px]" src="https://tuentrada.com/experiencia/ayuda-consulta/dni.png" alt="" />
        </div>
        {scan ? (
          <span className="whitespace-nowrap btn-primary">Cancelar Cámara</span>
        ) : (
          <span className="whitespace-nowrap btn-primary">Activar Cámara</span>
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

      {scan && !imageSrc && (
        cameraError ? (
          <div className="text-red-600 text-xs mt-2 flex">
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
          </svg>{" "}<span>Debe acceder a los permisos de la cámara para poder escanear su DNI.</span>
          </div>
        ) : (
          <>
            <Webcam
              className="rounded-lg"
              ref={webcamRef}
              height={160}
              width={720}
              videoConstraints={{ facingMode: facingMode }}
              onUserMediaError={() => setCameraError(true)}
            />
            <div style={{background:"linear-gradient(0deg, rgba(0,0,0,0.99) 0%, rgba(0,0,0,0) 100%)"}} className="flex justify-evenly items-center p-3 relative -top-[72px] rounded-lg">   
              <button
                className="w-12"
                type="button"
                onClick={() =>
                  setFacingMode((prev) =>
                    prev === "user" ? "environment" : "user"
                  )
                }
              >
                <span className="whitespace-nowrap"><img src="https://tuentrada.com/experiencia/ayuda-consulta/scan2.svg" alt="" /></span>
              </button>
              <button 
                className="w-12"
                type="button"
                onClick={capturePhoto}
              >
                <img src="https://tuentrada.com/experiencia/ayuda-consulta/scan3.svg" alt="" />
              </button>
            </div>
          </>
        )
      )}

      {imageSrc && (
        <>
          <img src={imageSrc} alt="" className="mt-2 rounded-lg" />
          <div style={{background:"linear-gradient(0deg, rgba(0,0,0,0.99) 0%, rgba(0,0,0,0) 100%)"}} className="flex justify-evenly items-center p-3 relative -top-[72px] rounded-lg">  
            <button
              className="w-12"
              type="button"
              onClick={() => setImageSrc(null)}
            >
              <img src="https://tuentrada.com/experiencia/ayuda-consulta/scan1.svg" alt="" />
            </button>
          </div>
        </>
      )}
    </div>
  );
};
