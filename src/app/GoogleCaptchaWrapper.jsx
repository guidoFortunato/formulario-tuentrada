"use client";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

export default function GoogleCaptchaWrapper({ children }) {
  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY_GOOGLE;

  return (
    <GoogleReCaptchaProvider reCaptchaKey={recaptchaSiteKey}>
      {children}
    </GoogleReCaptchaProvider>
  );
}
