"use client"

import { useContext, useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { FormContext } from "@/context/FormContext";
import { useRouter } from "next/navigation";
import { Email } from "./Email";
import { ConfirmEmail } from "./ConfirmEmail";

export const FormTarjeta = ({ params }) => {
  const {
    handleSubmit,
    reset,
    token,
  } = useContext(FormContext);
  const [captcha, setCaptcha] = useState("");
  const [errorRecaptcha, setErrorRecaptcha] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleRecaptcha = (e) => {
    setCaptcha(e);
    setErrorRecaptcha(false);
  };

  useEffect(() => {
    reset();
  }, []);

  const onSubmit = async (data, event) => {
    event.preventDefault();
    setIsLoading(true);
    console.log({data})

    try {
      //   if (captcha === "") {
      //     setErrorRecaptcha(true);
      //     return;
      //   }

    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto bg-main-image bg-no-repeat bg-left-50  px-10 md:px-20 flex-1">
      <div className="mb-5">
        <h2 className="text-2xl text-blue-dark font-semibold">
          Completá la información
        </h2>
        <span className="text-sm text-gray-500   italic">
          {/* {category} » {subtitleArticle.length > 0 && ` » ${subtitleArticle}`} {subCategory} */}
        </span>
      </div>
      <form className="mt-10" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4 mb-4 grid-cols-1 sm:grid-cols-2">
          <Email />
          <ConfirmEmail />
        
          {/* <div className="outer-container">
          <div className="inner-container">
            <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
              onChange={handleRecaptcha}
            />
            {errorRecaptcha && (
              <span className="text-red-600 text-sm block mt-1">
                Este campo es obligatorio
              </span>
            )}
         
          </div>
        </div> */}
        </div>
        <div className="justify-center flex pb-10">
          <button
            type="submit"
            className="text-white bg-gradient-to-r from-blue-light to-blue-dark hover:bg-gradient-to-bl font-medium rounded-md text-sm px-5 py-2.5 text-center mr-2 mb-2 mt-10 w-[150px]"
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
};
