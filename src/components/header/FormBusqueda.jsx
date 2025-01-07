"use client";

import { useEffect, useRef, useState } from "react";
import { MdOutlineSearch } from "react-icons/md";
import Link from "next/link";
import clsx from "clsx";
import { alertWarning } from "@/helpers/Alertas";
import { Loader } from "../loading";
import { Timer } from "./Timer";
import { getOrCreateUserId } from "@/utils/userId";

export const FormBusqueda = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);
  const [value, setValue] = useState("");
  const panelRef = useRef();
  const [loading, setLoading] = useState(false);
  const searchTimer = useRef(null);
  const [error, setError] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [timeDifference, setTimeDifference] = useState("");
  const [enableTimer, setEnableTimer] = useState(false);

  // console.log({ data });
  // console.log({ isOpen });

  //! ver si poner cuantos segudnos quedan, o poner que siempre que pasen los MAX_REQUESTS necesiten un minuto completo para vovler a hacer una peticion

  const fetchResults = async (value) => {
    const userId = getOrCreateUserId(); // Obtén o genera el userId único
    try {
      const response = await fetch("/api/proxy/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ value, userId }),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      setError(true);
      setErrorMessage("No se pudo completar la búsqueda");
    }
  };

  useEffect(() => {
    // Lógica de búsqueda
    const search = async () => {
      try {
        setLoading(true); // Activar indicador de carga
        if (value.length >= 3) {
          const {
            data: articles,
            ok,
            error: errorFetch,
            time,
          } = await fetchResults(value);
          

          if (!ok) {
            setError(true);
            setIsOpen(false);
            setErrorMessage(errorFetch);
            if (time) {
              setTimeDifference(time);
              setEnableTimer(true)
              setDisabled(true)
            }
            return;
          }

          if (articles.length === 0) {
            setIsOpen(false);
            setError(true);
            setErrorMessage("No se encontraron coincidencias");
          }
          if (articles.length > 0) {
            setIsOpen(true);
            setError(false);
            setData(articles);
          }
        }
      } catch (err) {
        console.log({ err });
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
    if (!value.trim()) {
      alertWarning();
      return;
    }
    setIsOpen(false);
  };

  const handleTimerEnd = () => {
    setError(false);
    setEnableTimer(false);
    setDisabled(false);
  };

  return (
    <form onSubmit={onSubmit} className="relative">
      <div className="relative">
        <input
          className={clsx(
            "block w-full p-4 text-base shadow-md border rounded-lg focus:ring-blue-light",
            {
              "bg-gray-100 text-gray-500 border-gray-300": loading || disabled,
              "text-gray-900 bg-white border-gray-300": !loading && !disabled,
            }
          )}
          name="search"
          type="text"
          placeholder="¿Qué estás buscando?..."
          value={value}
          onChange={handleChange}
          autoComplete="off"
          disabled={loading || disabled}
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
          {enableTimer ? (
            <Timer
              timeDifference={timeDifference}
              onTimerEnd={handleTimerEnd}
            />
          ) : (
            errorMessage
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
