import Script from "next/script";
import { Inter } from "next/font/google";
import FormProvider from "@/context/FormContext";
import { ContainerApp } from "@/components/container/ContainerApp";
import CookieBanner from "@/components/analytics/CookieBanner";
import GoogleAnalyticsContainer from "@/components/analytics/GoogleAnalyticsContainer";
import { TagManager } from "@/components/tagmanager/TagManager";
import { ResetStep } from "@/components/formulario/ResetStep";

import "./globals.css";

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
      </head>
      <body
        className={`${inter.className} flex flex-col min-h-[100vh] m-0`}
        suppressHydrationWarning={true}
        id="root"
      >
        <GoogleAnalyticsContainer />
        <FormProvider>
          <TagManager />
          <ContainerApp>{children}</ContainerApp>
          <CookieBanner />
          <ResetStep />
        </FormProvider>
      </body>
    </html>
  );
}
