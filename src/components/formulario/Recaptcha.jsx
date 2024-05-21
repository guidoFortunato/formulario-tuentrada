"use client";
import { useEffect, useRef, useState } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import { useRouter } from "next/navigation";

export const Recaptcha = () => {
  const [statusCloud, setStatusCloud] = useState("");
  const [tokenCloud, setTokenCloud] = useState("");
  const ref = useRef();
  const router = useRouter();

  console.log({ statusCloud });

  const handleEvent = async (e, response) => {
    console.log("entra");
    console.log({ statusCloud });
    // console.log({ response, e });

    setStatusCloud(response);
    setTokenCloud(e);
  };

  useEffect(() => {
    if (tokenCloud !== "" || statusCloud !== "") {
      console.log({ statusCloud });
      if (statusCloud === "error") {
        setStatusCloud("error");
        window.turnstile.reset();
        // console.log({ statusCloud });
        // router.push(
        //   "https://www.tuentrada.com/experiencia/ayuda-consulta/bot.html"
        // );
        return;
      }
      if (statusCloud === "success") {
        const resultRecaptcha = async () => {
          const serverValidation = await fetch("/api/cf", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(tokenCloud),
          });
          console.log({ resCf: serverValidation });
          if (!serverValidation.ok) {
            // console.log({ serverValidation });
            window.turnstile.reset();
            return;
          }

          const { data: dataServer } = await serverValidation.json();
          console.log({ dataServer });

          if (process.env.NEXT_PUBLIC_RECAPTCHA_ACTIVE === "true") {
            const form = new FormData();
            form.set("status", dataServer["error-codes"]);
            try {
              const res = await fetch("/api/recaptcha", {
                method: "POST",
                body: form,
              });
              console.log({ recaptchaResponse: res});
            } catch (error) {
              console.log({ error });
            }
          }
          const { success } = dataServer;
          console.log({ success });
          if (!success) {
            // console.log({ dataServer });
            setStatusCloud("error");
            window.turnstile.reset();
            // router.push(
            //   "https://www.tuentrada.com/experiencia/ayuda-consulta/bot.html"
            // );
            return;
          }
          // console.log({success})

          // window.turnstile.remove();
          // setStatusCloud("")
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
        handleEvent(e, "expired");
        ref.current?.reset();
      }}
      onSuccess={(e) => handleEvent(e, "success")}
      options={{
        theme: "light",
        language: "es",
        refreshExpired: "auto",
        size: "normal",
      }}
    />
  );
};
