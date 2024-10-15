"use client";

import { useEffect, useRef, useState } from "react";
import { MdOutlineSearch } from "react-icons/md";
import Link from "next/link";
import { getDataCache } from "@/helpers/getInfoTest";
import { alertWarning } from "@/helpers/Alertas";
import { Loader } from "../loading";
import clsx from "clsx";
import { Timer } from "./Timer";

export const FormBusqueda = ({ token }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);
  const [value, setValue] = useState("");
  const panelRef = useRef();
  const [loading, setLoading] = useState(false);
  const searchTimer = useRef(null);
  const [error, setError] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [timeDifference, setTimeDifference] = useState("");
  const [existClientDate, setExistClientDate] = useState(false);

  // console.log({ data });
  // console.log({ isOpen });

  useEffect(() => {
    // Lógica de búsqueda
    const search = async () => {
      try {
        setLoading(true); // Activar indicador de carga
        if (value.length >= 3) {
          const res = await getDataCache(
            `https://${process.env.NEXT_PUBLIC_API}/api/v1/atencion-cliente/search/article/${value}`,
            token
          );
          // console.log({res})
          if (res.status === 429) {
            // Si ocurre un error 429, guardar la hora actual en localStorage
            const clientDate = Number(localStorage.getItem("clientDate"));

            if (!clientDate) {
              // console.log("entra a !clientDate");
              setExistClientDate(false);
              localStorage.setItem("clientDate", Date.now());
              setTimeDifference(61000);
              setDisabled(true);
              setError(true);
              setTimeout(() => {
                setDisabled(false);
                setError(false);
                localStorage.removeItem("clientDate");
              }, 61000); // 60 segundos
            } else {
              // console.log("entra a clientDate");
              const currentDate = Date.now();
              const timeLeft = 61000 - (currentDate - clientDate);
              // console.log({ timeLeft });
              setExistClientDate(true);
              setTimeDifference(currentDate - clientDate);
              setDisabled(true);
              setError(true);
              setTimeout(() => {
                setDisabled(false);
                setError(false);
                localStorage.removeItem("clientDate");
              }, timeLeft);
            }
            return;
          }

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
        console.log({ error });
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

  const handleClick = () => {
    setIsOpen(false);
    setValue("");
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // console.log("enter");
    if (!value.trim()) {
      alertWarning();
      return;
    }
    setIsOpen(false);
  };

  if (token === "") return <span></span>;

  return (
    <form onSubmit={onSubmit} className="relative">
      <div className="relative">
        <input
          className={clsx(
            "block w-full p-4 text-base shadow-md border rounded-lg focus:ring-blue-light",
            {
              "bg-gray-100 text-gray-500 border-gray-300": disabled && !loading,
              "bg-gray-100 text-gray-500 border-gray-300": !disabled && loading,
              "text-gray-900 bg-white border-gray-300": !disabled && !loading,
            }
          )}
          name="search"
          type="text"
          placeholder="¿Qué estás buscando?..."
          value={value}
          onChange={handleChange}
          autoComplete="off"
          disabled={disabled === false ? loading : disabled}
        />
        {loading && <Loader />}
      </div>
      {error && (
        <span className="text-red-500 text-sm flex items-center pt-1">
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
          {disabled ? (
            <Timer
              timeDifference={timeDifference}
              existClientDate={existClientDate}
            />
          ) : (
            "No se encontraron coincidencias"
          )}
        </span>
      )}
      {isOpen && (
        <div
          className={`absolute w-[-webkit-fill-available] bg-white z-10 rounded-lg shadow-xl mt-1 overflow-hidden border border-gray-200 ${
            data.length > 5 ? "h-[292px] overflow-y-scroll" : ""
          }`}
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
                      <div className="border-gray-200 border-t flex items-center cursor-pointer text-gray-700 hover:bg-blue-light hover-div gap-4 p-5 ">
                        <MdOutlineSearch className="w-6 h-6 mr-2 icon-search" />

                        <h3 className="text-base font-semibold">
                          {item.title} <br />
                          <span className="text-blue-dark text-sm bold-none">
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
