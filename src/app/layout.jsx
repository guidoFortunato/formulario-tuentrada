import { Inter } from "next/font/google";
import FormProvider from "@/context/FormContext";
import { ContainerApp } from "@/components/container/ContainerApp";

import "./globals.css";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import CookieBanner from "@/components/analytics/CookieBanner";

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
      <GoogleAnalytics id="G-K2KT0GJC8Q" />
      <body
        className={`${inter.className} flex flex-col min-h-[100vh] m-0`}
        suppressHydrationWarning={true}
      >
        <FormProvider>
          <ContainerApp>{children}</ContainerApp>
          <CookieBanner />
        </FormProvider>
      </body>
    </html>
  );
}
