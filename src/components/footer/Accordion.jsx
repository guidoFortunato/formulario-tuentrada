"use client";

import Link from "next/link";
import { useState } from "react";
import { animateScroll as scroll } from "react-scroll";

const Accordion = ({ data }) => {
  // Estado acordeón abierto o cerrado
  const [open, setOpen] = useState(false);
  const { pages } = data;

  // Filtrar las páginas que están destinadas al pie de página
  const objectsFooter = pages.filter((page) => page.where === "footer");

  // Obtener los nombres únicos de los tipos de página
  const typeNames = [...new Set(objectsFooter.map((item) => item.type.name))];

  // Manejar el clic en el botón del acordeón
  const handleClick = () => {
    setOpen((prevState) => !prevState);

    // Si el acordeón se abre, realizar un desplazamiento suave al final de la página
    if (!open) {
      scroll.scrollToBottom({
        duration: 500, // Duración de la animación en milisegundos
        smooth: "easeInOutQuart", // Tipo de animación
      });
    }
  };

  return (
    <div className="accordion flex justify-center flex-col items-center pt-2">
      {/* Botón del acordeón */}
      <button
        className="accordion-button py-1 px-7 sm:w-[auto] lg:w-[20%] bg-slate-800 opacity-70 rounded-t-xl text-white active:bg-blue-700 active:opacity-70"
        onClick={handleClick}
      >
        {open ? "CERRAR ▲" : "MÁS INFORMACIÓN ▼"}
      </button>
      {/* Contenido del acordeón */}
      <div
        className={`accordion-content ${open ? "max-h-screen" : "max-h-0"} transition-max-h ease-in-out duration-500 overflow-hidden w-full ${
          open && "border-t border-[#8d858959]"
        }`}
      >
        {/* Lista de tipos de páginas con enlaces */}
        <div className="py-5 border-[#8d858959] flex justify-evenly flex-col md:flex-row text-gray-200 mb-2 text-lg font-semibold">
          {typeNames.map((item) => (
            <div className="text-center mt-5 md:mt-0 md:w-[33%] w-[100%]" key={item}>
              {/* Nombre del tipo de página */}
              <p>{item}</p>
              {/* Lista de enlaces para cada página del tipo actual */}
              <ul className="text-[12px] font-normal leading-relaxed text-gray-400  ">
                {pages.map((page) =>
                  item === page.type.name ? (
                    <li key={page.id}>
               
                      <Link href={page.path} className="hover:underline ">
                        {page.title}
                      </Link>
                    </li>
                  ) : null
                )}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Accordion;
