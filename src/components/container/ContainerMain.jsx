"use client"

import { useContext, useEffect, useState } from "react";
import CardCategoria from "@/components/main/CardCategoria";
import { getDataPrueba } from "@/helpers/getInfoTest";
import { Loader } from "@/components/loading";
import { FormContext } from "@/context/FormContext";
import { Skeleton } from "../main/Skeleton";

const initialState = []

export const ContainerMain = () => {

  const { token } = useContext(FormContext)
  const [ dataCategories, setDataCategories ] = useState(initialState);
  // console.log({dataCategories})
  // console.log({tokenFueraUef: token})
  useEffect(() => {
    if (token !== '') {
      // console.log({tokenUef: token})
      console.log('useEffect main')
      const getDataCategories = async () => {
        const info = await getDataPrueba( "https://testapi.tuentrada.com/api/v1/atencion-cliente/categories", token );
        const { categories } = info.data;
        setDataCategories(categories)
      };
      getDataCategories()
    }
    
  }, [token]);

  

  // useEffect(() => {
  //   const getData = async () => {
  //     if (tokenStorage) {
  //       console.log("useEffect main tokenStorage");
  //       const currentDate = Date.now();

  //       if (currentDate < tokenExpiresStorage) {          
  //         console.log("token no expiró");

  //         const getDataCategories = async () => {
  //           const info = await getDataPrueba(
  //             "https://testapi.tuentrada.com/api/v1/atencion-cliente/categories",
  //             tokenStorage
  //           );
  //           const { categories } = info?.data;
  //           setDataCategories(categories);
  //         };

  //         getDataCategories();

  //       } else {
  //         console.log("token expiró");

  //         const getDataCategories = async() => {
  //           const { token, tokenExpires } = await getToken();
  //           const info = await getDataPrueba(
  //             "https://testapi.tuentrada.com/api/v1/atencion-cliente/categories",
  //             token
  //           );
  //           const { categories } = info?.data;
  //           setDataCategories(categories);
  //           localStorage.setItem("token", token);
  //           localStorage.setItem("tokenExpires", tokenExpires);
  //         };

  //         getDataCategories();
  //       }
  //     }

  //     if (!tokenStorage) {
  //       console.log("useEffect main SIN tokenStorage");
  //       const getDataCategories = async () => {
  //         const { token, tokenExpires } = await getToken();
  //         const info = await getDataPrueba(
  //           "https://testapi.tuentrada.com/api/v1/atencion-cliente/categories",
  //           token
  //         );
  //         const { categories } = info?.data;
  //         setDataCategories(categories);
  //         localStorage.setItem("token", token);
  //         localStorage.setItem("tokenExpires", tokenExpires);
  //       };
  //       getDataCategories();
  //     }
  //   };
  //   getData()
  // }, []);

  if(dataCategories === undefined) return <Loader />
  if(dataCategories.length === 0 ) 
  return (
    <main>
      <div className="container mx-auto bg-main-image bg-no-repeat bg-left-50 pb-10 flex-1">
        <section className="w-[80%] grid grid-cols-1 md:grid-cols-2 justify-items-center gap-4 mx-auto mt-4">
          {[0,1].map((item) => (
              <Skeleton key={item} />
            ))}
        </section>

        <section className="w-[100%] grid grid-cols-1 justify-items-center gap-4 mx-auto mt-4">
          {[2].map((item) => (
              <Skeleton key={item} width="w-[70%]" />
            ))}
        </section>

        <section className="w-[80%] grid grid-cols-1 lg:grid-cols-3 justify-items-center gap-4 mx-auto mt-4">
          {[5,6,7].map((item) => (
              <Skeleton key={item} />
            ))}
        </section>
      </div>
    </main>
  )
  //! manejo de errores, cuando dataCategories es undefined enviar a pagina de error

  const firstCategories = dataCategories.slice(0, 2);
  const thirdCategory = dataCategories.slice(2, 3);
  const restCategories = dataCategories.slice(3);

  return (
    <main>
      <div className="container mx-auto bg-main-image bg-no-repeat bg-left-50 pb-10 flex-1">
        <section className="w-[80%] grid grid-cols-1 md:grid-cols-2 justify-items-center gap-4 mx-auto mt-4">
          {firstCategories.length > 0 &&
            firstCategories.map((item) => (
              <CardCategoria
                color={item.color}
                title={item.name}
                slug={item.slug}
                key={item.id}
                description={item.reference}
                icon={item.svg}
              />
            ))}
        </section>

        <section className="w-[80%] grid grid-cols-1 justify-items-center gap-4 mx-auto mt-4">
          {thirdCategory.length > 0 &&
            thirdCategory.map((item) => (
              <CardCategoria
                color={item.color}
                title={item.name}
                slug={item.slug}
                key={item.id}
                description={item.reference}
                icon={item.svg}
              />
            ))}
        </section>

        <section className="w-[80%] grid grid-cols-1 lg:grid-cols-3 justify-items-center gap-4 mx-auto mt-4">
          {restCategories.length > 0 &&
            restCategories.map((item) => (
              <CardCategoria
                color={item.color}
                title={item.name}
                slug={item.slug}
                key={item.id}
                description={item.reference}
                icon={item.svg}
              />
            ))}
        </section>
      </div>
    </main>
  )
}