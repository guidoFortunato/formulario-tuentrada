import { FormBusqueda } from "./FormBusqueda";

const InputBusqueda2 = () => {
  
  return (
    <>
      <div className="flex justify-center flex-col items-center my-10">
        <section className="flex justify-center items-center flex-col">
          <h1 className="text-[1.5rem] md:text-[2rem] text-blue-dark font-semibold mb-3 text-center">
            {/* {data.name} */}
            Centro de Ayuda y Consultas

          </h1>
        </section>
        <div className="w-[95%] md:w-2/5">
          <FormBusqueda />
        </div>
      </div>
    </>
  );
};
export default InputBusqueda2;
