import { Steps } from ".";
import { FormStep } from "./FormStep";

export const Formularios = ({ dataForm, params, token }) => {

  const category =
    params.categoria.slice(0, 1).toUpperCase() +
    params.categoria.split("-").join(" ").slice(1).toLowerCase();
  const subCategory =
    params.subcategoria.slice(0, 1).toUpperCase() +
    params.subcategoria.split("-").join(" ").slice(1).toLowerCase();

  return (
    <div className="container mx-auto bg-main-image bg-no-repeat bg-left-50  px-10 md:px-20 flex-1">
      <div className="mb-5">
        <h2 className="text-[1.6rem] text-blue-dark font-bold">
          Completá la información
        </h2>
        <span className="text-base text-gray-500   italic">
        </span>
      </div>
      <Steps dataForm={dataForm} />
      <FormStep
        dataForm={dataForm}
        category={category}
        subCategory={subCategory}
        token={token}
      />
    </div>
  );
};
