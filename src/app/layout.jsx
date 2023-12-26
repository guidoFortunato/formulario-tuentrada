import FormProvider from "@/context/FormContext";
import { Inter } from "next/font/google";

import "./globals.css";
import { ContainerApp } from "@/components/container/ContainerApp";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Ayuda TuEntrada - Home",
  description: "Página de ayuda para los clientes",
};

export default async function RootLayout({ children }) {
  // console.log({dataCache})
  return (
    <html lang="es">
      <body
        className={`${inter.className} flex flex-col min-h-[100vh] m-0`}
        suppressHydrationWarning={true}
      >
        <FormProvider>
          <ContainerApp>{children}</ContainerApp>
        </FormProvider>
      </body>
    </html>
  );
}
