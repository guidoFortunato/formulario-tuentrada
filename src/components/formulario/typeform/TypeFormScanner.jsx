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

  function capturePhoto() {
    const imageSrc = webcamRef.current.getScreenshot();
    setImageSrc(imageSrc);
  }

  const handleScan = () => {
    setScan((prev) => !prev);
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
          "btn-primary bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5",
          {
            "border-red-500 focus:ring-red-300 focus:border-red-500":
              errors[name],
            "border-gray-300 focus:ring-blue-300 focus:border-blue-dark":
              !errors[name],
          }
        )}
        onClick={handleScan}
        name={name}
        id={name}
        type="button"
      >
        {scan ? (
          <span className="whitespace-nowrap">Cancelar scaneo</span>
        ) : (
          <span className="whitespace-nowrap">Scanear DNI</span>
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
      {scan && (
        <>
          <Webcam
            ref={webcamRef}
            height={160}
            width={720}
            videoConstraints={{ facingMode: facingMode }}
          />
          <button
            className="btn-primary mt-3"
            type="button"
            onClick={capturePhoto}
          >
            Tomar foto
          </button>
         
          <button
            className="btn-primary mt-3 ml-2"
            type="button"
            onClick={() =>
              setFacingMode((prev) =>
                prev === "user" ? "environment" : "user"
              )
            }
          >
            <span className="whitespace-nowrap">Cámara "{facingMode}"</span>
          </button>
          <button
            className="btn-primary mt-3"
            type="button"
            onClick={ () => setImageSrc(null) }
          >
            Cancelar
          </button>

          {imageSrc && <img src={imageSrc} alt="" className="mt-2" />}
        </>
      )}
    </div>
  );
};
