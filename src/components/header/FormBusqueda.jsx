"use client";

import { useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { getDataPrueba } from "@/helpers/getInfoTest";
import { alertWarning } from "@/helpers/Alertas";
import { Loader } from "../loading";
import { FormContext } from "@/context/FormContext";

export const FormBusqueda = () => {
  const { token } = useContext(FormContext);
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);
  const [value, setValue] = useState("");
  const panelRef = useRef();
  const [loading, setLoading] = useState(false);
  const searchTimer = useRef(null);
  const [error, setError] = useState(false);

  // console.log({ data });
  // console.log({ isOpen });

  useEffect(() => {
    // Lógica de búsqueda
    const search = async () => {
      try {
        setLoading(true); // Activar indicador de carga
        if (value.length >= 3) {
          const res = await getDataPrueba(
            `https://${process.env.NEXT_PUBLIC_API}/api/v1/atencion-cliente/search/article/${value}`,
            token
          );
          // console.log({ res });
          if (res.data?.articles?.length > 0) {
            setIsOpen(true);
            setError(false);
          }
          if (res.errors) {
            setIsOpen(false);
            setError(true);
          }

          setData(res?.data?.articles);
        }
      } catch (err) {
        // console.error({
        //   err,
        //   message: "No se encontraron datos",
        // });
      } finally {
        setLoading(false); // Desactivar indicador de carga
      }
    };

    // Establecemos un temporizador para esperar a que el usuario deje de escribir
    clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(search, 1000); // Tiempo de espera en milisegundos
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        // Click outside the panel, close the autocomplete
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleChange = (e) => {
    setValue(e.target.value);
    setError(false);
  };

  const handleClick = (item) => {
    // console.log({ item });
    setIsOpen(false);
    setValue("");
    // setSlug(item.category.slug);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // console.log("enter");
    if (!value.trim()) {
      alertWarning();
      return;
    }
    // setValue("");
    setIsOpen(false);
  };

  if (token === "") return <span></span>;

  return (
    <form onSubmit={onSubmit} className="relative">
      <div className="relative">
        <input
          className={`block w-full p-4 text-sm ${
            loading ? "text-gray-300" : "text-gray-900"
          } border ${
            loading ? "border-gray-100" : "border-gray-300"
          } rounded-lg bg-white focus:ring-blue-light`}
          name="search"
          type="text"
          placeholder="¿Qué estás buscando?..."
          value={value}
          onChange={handleChange}
          autoComplete="off"
          disabled={loading}
        />
        {loading && <Loader />}

       
      </div>
      {error && (
        <span className="text-red-500 text-xs flex items-center pt-1">
          <svg
            className="mr-1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            width="16px"
            height="16px"
          >
            <path
              fill="#f44336"
              d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"
            />
            <path
              fill="#fff"
              d="M29.656,15.516l2.828,2.828l-14.14,14.14l-2.828-2.828L29.656,15.516z"
            />
            <path
              fill="#fff"
              d="M32.484,29.656l-2.828,2.828l-14.14-14.14l2.828-2.828L32.484,29.656z"
            />
          </svg>{" "}
          No se encontraron coincidencias
        </span>
      )}
      {isOpen && (
        <div
          className={`absolute w-[-webkit-fill-available] bg-white z-10 rounded-lg shadow-xl mt-1 overflow-hidden border border-gray-200 ${data.length > 5 ? "h-[292px] overflow-y-scroll": "" }` }
          ref={panelRef}
        >

          {data.map((item) => {
            return (
              <section key={item.id}>
                <ul>
                  <li>
                    <Link
                      href={`/${item.category.slug}/${item.slug}`}
                      onClick={() => handleClick(item)}
                    >
                      <div className="border-gray-200 border-b flex items-center cursor-pointer text-gray-700 hover:bg-blue-light hover:text-white gap-4 p-4 ">
                        <svg
                          className="w-4 h-4 mr-2"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 20"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                          />
                        </svg>
                        <h3 className="text-sm font-semibold ">
                          {item.title} <br />
                          <span className=" text-blue-dark text-xs bold-none">
                            Categoría: {item.category.name}
                          </span>
                        </h3>
                      </div>
                    </Link>
                  </li>
                </ul>
              </section>
            );
          })}
        </div>
      )}
    </form>
  );
};
