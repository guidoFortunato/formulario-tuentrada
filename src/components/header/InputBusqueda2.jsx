import { FormBusqueda } from "./FormBusqueda";

const InputBusqueda2 = ({ token }) => {
  return (
    <div className="flex justify-center flex-col items-center my-20">
      <section className="flex justify-center items-center flex-col">
        <h1 className="text-[2rem] md:text-[2.5rem] text-blue-dark font-extrabold mb-3 text-center">
          {/* {data.name} */}
          Centro de Ayuda y Consultas
        </h1>
      </section>
      <div className="w-[75%] md:w-[50%] lg:w-[500px] ">
        <FormBusqueda token={token} />
      </div>
    </div>
  );
};
export default InputBusqueda2;
