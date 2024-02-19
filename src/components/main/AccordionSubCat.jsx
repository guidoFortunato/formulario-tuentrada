"use client";

import { useContext, useState } from "react";
import Link from "next/link";
import { FormContext } from "@/context/FormContext";

const AccordionSubCat = ({ name = "", articles = [], params }) => {
  const { handleSubtitleArticle } = useContext(FormContext);
  const [open, setOpen] = useState(false);
  const [loadedArticles, setLoadedArticles] = useState(5); // Número de artículos inicialmente cargados

  const handleClick = () => {
    setOpen((prevstate) => !prevstate);
  };

  const renderedArticles = articles.slice(0, loadedArticles); // Mostrar solo los artículos cargados hasta ahora
  const remainingArticles = articles.slice(loadedArticles); // Artículos restantes para cargar

  const loadMoreArticles = () => {
    setLoadedArticles(articles.length); // Cargar todos los artículos
  };

  return (
    <div
      id="accordion-flush"
      data-accordion="collapse"
      data-active-classes="bg-white text-gray-900"
      data-inactive-classes="text-gray-500 dark:text-gray-400"
    >
      <h2 id="accordion-flush-heading-1">
        <button
          type="button"
          className="flex items-center justify-between w-full py-5 font-medium text-left text-gray-500 border-b border-gray-200"
          data-accordion-target="#accordion-flush-body-1"
          aria-expanded="true"
          aria-controls="accordion-flush-body-1"
          onClick={handleClick}
        >
          <span className="font-semibold text-lg text-blue-dark">{name}</span>
          <svg
            data-accordion-icon
            className={`w-4 h-4 transition-transform transform ${
              open ? "rotate-180" : ""
            }`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5 5 1 1 5"
            />
          </svg>
        </button>
      </h2>
      <div
        id="accordion-flush-body-1"
        className={`overflow-hidden transition-max-height ease-in-out duration-300 ${
          open ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
        aria-labelledby="accordion-flush-heading-1"
      >
        <div className="py-5 border-b border-gray-200">
          {renderedArticles.map((item) => (
            <p className="text-gray-700 mb-1 pl-2" key={item.id}>
              <Link
                href={`${params.categoria}/${item.slug}`}
                className="text-base"
                onClick={() => handleSubtitleArticle(name)}
              >
                <span className="text-blue-dark">▸</span>{" "}
                <span className="hover:underline">{item.title}</span>
              </Link>
            </p>
          ))}
          {/* Mostrar el botón "Ver más" si hay más de 5 artículos */}
          {remainingArticles.length > 0 && (
            <p className="text-gray-700 mb-1 pl-2">
              <button onClick={loadMoreArticles}>
                <span className="underline text-blue-dark">Ver más</span>
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccordionSubCat;

