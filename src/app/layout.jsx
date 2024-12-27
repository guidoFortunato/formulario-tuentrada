import Script from "next/script";
import { Inter } from "next/font/google";
import FormProvider from "@/context/FormContext";
import { ContainerApp } from "@/components/container/ContainerApp";
import CookieBanner from "@/components/analytics/CookieBanner";
import GoogleAnalyticsContainer from "@/components/analytics/GoogleAnalyticsContainer";
import { TagManager } from "@/components/tagmanager/TagManager";
import { ResetStep } from "@/components/formulario/ResetStep";

import "./globals.css";
import SerenityChat from "@/components/serenity/SerenityChat";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Centro de Ayuda y Consultas de TuEntrada - Home",
  description:
    "Bienvenido a TuEntrada, centro de ayuda para eventos. Consultá nuestras políticas y devoluciones, accedé fácilmente con nuestras guías de 'Iniciar Sesión' y 'Preguntas Frecuentes', y optimizá tu experiencia con 'TuEntrada Wallet'. ¿Querés vender tus entradas? Descubrí más en 'Trabajá con nosotros'",
  keywords: [
    "TuEntrada",
    "Centro de Ayuda Argentina",
    "Devoluciones",
    "Política de Devolución",
    "Iniciar Sesión",
    "Pasos para Acceder",
    "TuEntrada Wallet",
    "Guía de Uso",
    "FAQs",
    "Trabajar con Nosotros",
  ],
};

export default async function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE}`}
          strategy="lazyOnload"
          crossOrigin="anonymous"
        />
        {/* Add Serenity* Star Chat CSS */}
        <link
          key={"serenity-chat-styles"}
          rel="stylesheet"
          href="https://hub.serenitystar.ai/resources/chat.css"
        />
      </head>
      <body
        className={`${inter.className} flex flex-col min-h-[100vh] m-0`}
        suppressHydrationWarning={true}
        id="root"
      >
        <GoogleAnalyticsContainer />
        <FormProvider>
          <TagManager />
          <ContainerApp>
            {/* Placeholder for Chat Component */}
            <div id="aihub-chat"></div>
            {children}
            {/* Initialize Serenity Chat */}
            <SerenityChat />
            {/* Add Serenity* Star Chat JS */}
            <script src="https://hub.serenitystar.ai/resources/chat.js"></script>
          </ContainerApp>
          <CookieBanner />
          <ResetStep />
        </FormProvider>
      </body>
    </html>
  );
}
