"use client";

import { useState } from "react";
import dompurify from "isomorphic-dompurify";

export const ArticleAccordion = ({ itemColumn }) => {
  const [openStates, setOpenStates] = useState(
    itemColumn.acordion.map(() => false)
  );
  const sanitizer = dompurify.sanitize;

  // console.log({ itemColumn: itemColumn.acordion[0] });

  const handleClick = (index) => {
    setOpenStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];

      return newStates;
    });
  };

  return (
    <>
      {itemColumn.acordion &&
        itemColumn.acordion.map((item, index) => (
          <div
            id="accordion-flush"
            data-accordion="collapse"
            data-active-classes="bg-white text-gray-900"
            data-inactive-classes="text-gray-500 dark:text-gray-400"
            key={index}
          >
            <h2 id={`accordion-flush-heading-${index}`}>
              <button
                type="button"
                className="flex items-center justify-between w-full py-5 font-medium text-left text-gray-500 border-b border-gray-200"
                data-accordion-target={`#accordion-flush-body-${index}`}
                aria-expanded="true"
                aria-controls={`accordion-flush-body-${index}`}
                onClick={() => handleClick(index)}
              >
                <span className="font-semibold text-lg text-blue-dark">
                  {item.titulo}
                </span>
                <svg
                  data-accordion-icon
                  className="w-3 h-3 rotate-180 shrink-0"
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
              id={`accordion-flush-body-${index}`}
              className={openStates[index] ? "" : "hidden"}
              aria-labelledby={`accordion-flush-heading-${index}`}
            >
              {/* <div className="py-5 border-b border-gray-200">
                  {item.descripcion}
                </div> */}
              <div className="text-base text-gray-700 py-5"
                dangerouslySetInnerHTML={{
                  __html: sanitizer(item.descripcion),
                }}
              ></div>
            </div>
          </div>
        ))}
    </>
  );
};
