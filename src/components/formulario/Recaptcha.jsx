"use client";
import { useContext, useEffect, useRef, useState } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import { FormContext } from "@/context/FormContext";
import { useRouter } from "next/navigation";

export const Recaptcha = () => {
  const ref = useRef();
  const { handleTokenCloud, handleStatusCloud, tokenCloud, statusCloud } =
    useContext(FormContext);
  const router = useRouter();
  // console.log({tokenCloud, statusCloud})

  const handleEvent = async (e, response) => {

    if (process.env.NEXT_PUBLIC_RECAPTCHA_ACTIVE === "true") {
      const form = new FormData();
      form.set("status", e);
      try {
        const res = await fetch("/api/recaptcha", {
          method: "POST",
          body: form,
        });
        console.log({ res });
      } catch (error) {
        console.log({ error });
      }
    }

    console.log({ status: response });
    handleStatusCloud(response);
  };

  useEffect(() => {
    if (tokenCloud !== "" || statusCloud !== "") {
      if (statusCloud === "error") {
        console.log({ statusCloud });
        router.push(
          "https://www.tuentrada.com/experiencia/ayuda-consulta/bot.html"
        );
        return;
      }
      if (statusCloud === "solved") {
        const resultRecaptcha = async () => {
          const serverValidation = await fetch("/api/cf", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(tokenCloud),
          });
          // console.log({ serverValidation });
          if (!serverValidation.ok) {
            // console.log("!serverValidation.ok")
            // console.log({ serverValidation });
            window.turnstile.reset();
            return;
          }

          const { data: dataServer } = await serverValidation.json();
          // console.log({ dataServer });
          const { success } = dataServer;
          // console.log({success})
          if (!success) {
            // console.log("!serverValidation.ok");
            // console.log({ dataServer });
            window.turnstile.reset();
            return;
          }
          // console.log({success})

          window.turnstile.remove();
        };
        resultRecaptcha();
      }
    }
  }, [tokenCloud, statusCloud]);

  return (
    <Turnstile
      ref={ref}
      siteKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY_CLOUDFLARE}
      onError={async (e) => handleEvent(e, "error")}
      onExpire={(e) => {
        ref.current?.reset();
        handleEvent(e, "expired");
      }}
      onSuccess={(e) => handleEvent(e, "success")}
      options={{
        theme: "light",
        language: "es",
        refreshExpired: "auto",
        size: "invisible",
      }}
    />
  );
};
