"use client";
import { useContext, useEffect, useRef, useState } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import { FormContext } from "@/context/FormContext";
import { useRouter } from "next/navigation";

export const Recaptcha2 = () => {
  const ref = useRef();
  const { handleTokenCloud, handleStatusCloud, tokenCloud, statusCloud } = useContext(FormContext);
  const router = useRouter();
  // console.log({tokenCloud, statusCloud})

  useEffect(() => {
    if (tokenCloud !== "" || statusCloud !== "") {
      if (statusCloud === "error") {
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
          // console.log('recaptcha exitoso')

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
      onError={() => handleStatusCloud("error")}
      onExpire={() => ref.current?.reset()}
      onSuccess={(e) => {
        handleStatusCloud("solved");
        handleTokenCloud(e);
      }}
      options={{
        theme: "light",
        language: "es",
        refreshExpired: "manual",
        size: "invisible"
      }}
    />
  );
};
