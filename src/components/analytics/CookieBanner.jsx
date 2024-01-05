"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getLocalStorage, setLocalStorage } from "@/helpers/storageHelper";

export default function CookieBanner() {
  const [cookieConsent, setCookieConsent] = useState(null);

  useEffect(() => {
    const newValue = cookieConsent ? "granted" : "denied";

    window.gtag("consent", "update", {
      analytics_storage: newValue,
    });

    setLocalStorage("cookie_consent", cookieConsent);

    //For Testing
    console.log("Cookie Consent: ", cookieConsent);
  }, [cookieConsent]);
  return (
    <div
      className={`my-10 mx-auto max-w-max md:max-w-screen-sm
                        fixed bottom-0 left-0 right-0 
                        ${
                          cookieConsent !== null ? "hidden" : "flex"
                        } px-3 md:px-4 py-5 justify-between items-center flex-col sm:flex-row gap-4  
                         bg-white rounded-lg shadow`}
    >
      <div className="text-center">
        <Link href="/info/cookies">
          <p>
            Usamos
            <span className="font-semibold text-blue-dark mx-1">cookies</span>
            en este sitio
          </p>
        </Link>
      </div>

      <div className="flex gap-2">
        <button
          className="px-5 py-2 text-gray-400 rounded-md border-gray-900"
          onClick={() => setCookieConsent(false)}
        >
          Rechazar
        </button>
        <button
          className="w-auto mr-2 text-white bg-gradient-to-r from-blue-light to-blue-dark hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:blue-dark  font-medium rounded-md text-sm px-5 py-2.5 text-center"
          onClick={() => setCookieConsent(true)}
        >
          Aceptar Cookies
        </button>
      </div>
    </div>
  );
}
