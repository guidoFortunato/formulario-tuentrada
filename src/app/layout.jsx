import { cookies } from "next/headers";
import { Inter } from "next/font/google";
import NavBar from "@/components/header/Navbar";
import Footer from "@/components/footer/Footer";
import { getDataCache, getTokenServer } from "@/helpers/getInfoTest";
import InputBusqueda2 from "@/components/header/InputBusqueda2";
import FormProvider from "@/context/FormContext";
import { Loader } from "@/components/loading";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Ayuda TuEntrada - Home",
  description: "Centro de Ayuda y Consultas - TuEntrada",
};

export default async function RootLayout({ children }) {
  let data;
  const cookieStore = cookies();
  const tokenCookies = cookieStore.get("token");
  const tokenExpiresCookies = cookieStore.get("tokenExpires");
  // let expireCookieToken = false;

  if (!tokenCookies) {
    const { token } = await getTokenServer();
    const infoCache = await getDataCache(
      `https://testapi.tuentrada.com/api/v1/site/ayuda.tuentrada.com`,
      token
    );
    data = infoCache?.data?.site;
  }

  if (tokenCookies) {
    const currentDate = Date.now();
    if (currentDate < tokenExpiresCookies.value) {
      const infoCache = await getDataCache(
        `https://testapi.tuentrada.com/api/v1/site/ayuda.tuentrada.com`,
        tokenCookies.value
      );
      data = infoCache?.data?.site;
    } else {
      //token expiró

      const { token } = await getTokenServer();
      const infoCache = await getDataCache(
        `https://testapi.tuentrada.com/api/v1/site/ayuda.tuentrada.com`,
        token
      );
      data = infoCache?.data?.site;
    }
  }

  // const dataCache = infoCache?.data?.site;
  // console.log({dataCache})
  return (
    <html lang="es">
      <body
        className={`${inter.className} flex flex-col min-h-[100vh] m-0`}
        suppressHydrationWarning={true}
      >
        <FormProvider>
          <header>
            <NavBar data={data} />
            <InputBusqueda2 data={data} />
          </header>
          {children}
          <Footer data={data} />
        </FormProvider>
      </body>
    </html>
  );
}
