"use client";

import Link from "next/link";
import { useState } from "react";

export const ToggleButtonElements = ({data}) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        data-collapse-toggle="navbar-default"
        type="button"
        className="inline-flex items-center p-2 w-10 h-10 justify-center text-base text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        aria-controls="navbar-default"
        aria-expanded="false"
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className="sr-only">Open main menu</span>
        <svg
          className="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 17 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 1h15M1 7h15M1 13h15"
          />
        </svg>
      </button>
      <div
        className={`${
          open ? "" : "hidden"
        } w-full mt-5 md:mt-0 md:block md:w-auto`}
        id="navbar-default"
      >
        <ul>
          {data.pages?.map((item) => {
            if (item.where === "navbar") {
              return (
                <li key={item.id}>
                  <Link
                    href={item.path}
                    className="text-[1rem] font-bold text-white hover:bg-transparent border-b-0 hover:text-slate-400 md:hover:text-slate-400"
                  >
                    {item.title}
                  </Link>
                </li>
              );
            }
          })}
        </ul>
      </div>
    </>
  );
};
