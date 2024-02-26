import { useContext, useEffect } from "react";
import Script from "next/script";
import { useRouter } from "next/navigation";
import { FormContext } from "@/context/FormContext";
import { FormStep, Steps } from ".";
import { Loader } from "../loading";

export const Formularios = ({ dataForm, params }) => {
  const { subtitleArticle } = useContext(FormContext);
  // console.log({dataForm})

  const category =
    params.categoria.slice(0, 1).toUpperCase() +
    params.categoria.split("-").join(" ").slice(1).toLowerCase();
  const subCategory =
    params.subcategoria.slice(0, 1).toUpperCase() +
    params.subcategoria.split("-").join(" ").slice(1).toLowerCase();

  const router = useRouter();
  useEffect(() => {
    // Si dataForm es undefined, redirigir al inicio
    if (dataForm === undefined) {
      router.push("/");
    }
  }, [dataForm]);

  // Si dataForm es undefined, no renderizar el resto del componente
  if (dataForm === undefined) {
    return <Loader />;
  }

  return (
      <div className="container mx-auto bg-main-image bg-no-repeat bg-left-50  px-10 md:px-20 flex-1">
        <div className="mb-5">
          <h2 className="text-2xl text-blue-dark font-semibold">
            Completá la información
          </h2>
          <span className="text-sm text-gray-500   italic">
            {/* {category} » {subtitleArticle.length > 0 && ` » ${subtitleArticle}`} {subCategory} */}
          </span>
        </div>
        <Steps dataForm={dataForm.form} />
        <FormStep
          dataForm={dataForm.form}
          category={category}
          subCategory={subCategory}
        />
      </div>
  );
};
