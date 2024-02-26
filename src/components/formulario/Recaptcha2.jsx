"use client";
import { useState } from "react";
import { Turnstile } from "@marsidev/react-turnstile";

export const Recaptcha2 = () => {
  const [status, setStatus] = useState("");
  const [token, setToken] = useState("");
  console.log({ status });
  const handleResult = (value) => {
    console.log({ value });
    setToken(value);
  };
  return (
    <Turnstile
      siteKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY_CLOUDFLARE}
      onError={() => setStatus("error")}
      onExpire={(e) => {
        setStatus("expired");
        handleResult(e);
      }}
      onSuccess={(e) => {
        setStatus("solved");
        handleResult(e);
      }}
      options={{
        theme: "light",
        language: "es",
      }}
    />
  );
};
