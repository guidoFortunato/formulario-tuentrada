// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { getLocalStorage, setLocalStorage } from "@/helpers/storageHelper";

// export default function CookieBanner() {
//   const [cookieConsent, setCookieConsent] = useState(null);

//   useEffect(() => {
//     const newValue = cookieConsent ? "granted" : "denied";

//     window.gtag("consent", "update", {
//       analytics_storage: newValue,
//     });

//     setLocalStorage("cookie_consent", cookieConsent);

//     //For Testing
//     console.log("Cookie Consent: ", cookieConsent);
//   }, [cookieConsent]);
//   return (
//     <div
//       className={`my-10 mx-auto max-w-max md:max-w-screen-sm
//                         fixed bottom-0 left-0 right-0
//                         ${
//                           cookieConsent !== null ? "hidden" : "flex"
//                         } px-3 md:px-4 py-3 justify-between items-center flex-col sm:flex-row gap-4
//                          bg-white rounded-lg shadow border border-gray-300`}
//     >
//       <div className="text-center text-sm">
//         <Link href="/info/cookies">
//           <p className="text-gray-500">
//             Usamos
//             <span className="font-semibold text-blue-dark mx-1">cookies</span>
//             en este sitio
//           </p>
//         </Link>
//       </div>

//       <div className="flex gap-2 text-sm">
//           <button
//           className="px-5 py-2 text-gray-500 rounded-md border-gray-900"
//           onClick={() => setCookieConsent(false)}
//         >
//          Personalizar
//         </button>
//         <button
//           className="w-auto mr-2 text-white bg-gradient-to-r from-blue-light to-blue-dark hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:blue-dark  font-medium rounded-md text-sm px-5 py-2.5 text-center text-sm"
//           onClick={() => setCookieConsent(true)}
//         >
//           Aceptar Cookies
//         </button>
//       </div>
//     </div>
//   );
// }
// Importa los componentes necesarios de React y Next.js
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getLocalStorage, setLocalStorage } from "@/helpers/storageHelper";

export default function CookieBanner() {
  const [cookieConsent, setCookieConsent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Inicializar las categorías aceptadas por defecto
  const initialAcceptedCategories = {
    required: true,
    functional_analytical: true,
    advertising: true,
    performance: true,
  };

  const [acceptedCategories, setAcceptedCategories] = useState(initialAcceptedCategories);

  useEffect(() => {
    const newValue = cookieConsent ? "granted" : "denied";

    window.gtag("consent", "update", {
      analytics_storage: newValue,
    });

    setLocalStorage("cookie_consent", cookieConsent);

    // Test cookies
    // console.log("Cookie Consent: ", cookieConsent);
  }, [cookieConsent]);

  const cookieCategories = [
    {
      id: "required",
      label: "Cookies requeridas",
      description:
        "Estas cookies son necesarias para permitir el funcionamiento principal del sitio web, garantizar que el sitio web sea seguro y permitirnos gestionar la autenticación del usuario.",
    },
    {
      id: "functional_analytical",
      label: "Cookies funcionales y analíticas",
      description:
        "Estas cookies son funcionales o analíticas. Las cookies funcionales se utilizan para mejorar lo que puede hacer en nuestro sitio, mientras que las cookies analíticas nos ayudan a entender cómo los usuarios interactúan con nuestro sitio, permitiéndonos mejorar el contenido y la experiencia del usuario.",
    },
    {
      id: "advertising",
      label: "Cookies publicitarias",
      description: "Estas cookies se utilizan con fines publicitarios, incluyendo Google AdSense.",
    },
    {
      id: "performance",
      label: "Cookies de rendimiento",
      description:
        "Estas cookies nos permiten contar las visitas y fuentes de circulación para poder medir y mejorar el rendimiento de nuestro sitio, incluyendo el uso de Google Analytics.",
    },
  ];

  const handleCategoryToggle = (categoryId) => {
    if (categoryId === 'required') {
      return; // Las cookies requeridas deben estar siempre activas
    }

    setAcceptedCategories((prevCategories) => ({
      ...prevCategories,
      [categoryId]: !prevCategories[categoryId],
    }));
  };

  const handleAcceptAll = () => {
    setAcceptedCategories(() => {
      const allAccepted = { ...initialAcceptedCategories };
      return allAccepted;
    });
  };

  const handleCustomizeClick = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <div
      className={`my-10 mx-auto max-w-max md:max-w-screen-sm fixed bottom-0 left-0 right-0 border border-gray-300 rounded-lg ${
        cookieConsent !== null ? "hidden" : "flex"
      } p-4 justify-between items-center bg-white rounded-t-md shadow-md max-w-max md:max-w-screen-sm`}
    >
      <div className="text-center text-xs text-gray-700">

          <p className="text-start">
            Este sitio utiliza cookies para mejorar su experiencia.
            <Link href="/info/cookies"> <span className="font-semibold text-blue-dark">Más información</span>     </Link>

   </p>
      </div>

      <div className="flex gap-2 text-sm">
        <button
          className="text-gray-600 text-xs"
          onClick={handleCustomizeClick}
        >
          Personalizar preferencias
        </button>

        <button
          className="w-auto text-white bg-gradient-to-r from-blue-light to-blue-dark hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:blue-dark rounded-md px-4 py-2 text-xs"
          onClick={() => setCookieConsent(true)}
        >
          Aceptar
        </button>

      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md">

            <h3 className="text-lg font-semibold mb-4 text-blue-dark">Preferencias de Cookies</h3>

            <div className="space-y-4 text-sm">
              {cookieCategories.map((category) => (
                <div key={category.id}>
                  <div className="flex items-center justify-between text-blue-dark">
                    <label className="font-semibold text-sm">
                      {category.label}
                    </label>
                    <input
                      type="checkbox"
                      className={`w-4 h-4 text-blue-dark bg-gray-100 border-gray-300 focus:ring-blue-dark ${
                        (category.id === 'required') && 'text-gray-400 pointer-events-none'
                      }`}
                      checked={acceptedCategories[category.id]}
                      onChange={() => handleCategoryToggle(category.id)}
                    />
                  </div>
                  <p className={`text-gray-700 w-[95%] ${(category.id === 'required') && 'text-gray-200'}`}>
                    {category.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center mt-4">
              <div>
                <button
                  className="py-2 text-blue-dark underline ml-3 text-sm"
                  onClick={handleAcceptAll}
                >
                  Aceptar todas las categorías
                </button>

                <button
                  className="py-2 text-gray-600 underline ml-3 text-sm"
                  onClick={() => {
                    setCookieConsent(false);
                    window.location.href = "https://www.tuentrada.com";
                  }}
                >
                  Rechazar todas las categorías
                </button>
              </div>
              <div>
                <button
                  className="w-auto text-white bg-gradient-to-r from-blue-light to-blue-dark hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:blue-dark rounded-md px-4 py-2 text-sm"
                  onClick={handleModalClose}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
