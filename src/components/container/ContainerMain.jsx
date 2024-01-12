"use client";

import { useContext, useEffect } from "react";
import CardCategoria from "@/components/main/CardCategoria";
import { Loader } from "@/components/loading";
import { FormContext } from "@/context/FormContext";
import { Skeleton } from "../skeleton/Skeleton";


export const ContainerMain = () => {
  const { dataCategories, resetStep, resetDefaultValue, resetGlpiSubCategory } = useContext(FormContext);

  // console.log({dataCategories})
  
  useEffect(() => {
    resetStep()
    resetDefaultValue()
    resetGlpiSubCategory()
  }, []);

  if (dataCategories === undefined) return <Loader />;
  if (dataCategories.length === 0)
    return (
      <main>
        <div className="container mx-auto bg-main-image bg-no-repeat bg-left-50 pb-10 flex-1">
          <section className="w-[80%] grid grid-cols-1 md:grid-cols-2 justify-items-center gap-4 mx-auto mt-4">
            {[0, 1].map((item) => (
              <Skeleton key={item} />
            ))}
          </section>

          <section className="w-[100%] grid grid-cols-1 justify-items-center gap-4 mx-auto mt-4">
            {[2].map((item) => (
              <Skeleton key={item} width="w-[70%]" />
            ))}
          </section>

          <section className="w-[80%] grid grid-cols-1 lg:grid-cols-3 justify-items-center gap-4 mx-auto mt-4">
            {[5, 6, 7].map((item) => (
              <Skeleton key={item} />
            ))}
          </section>
        </div>
      </main>
    );

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
  );
};
