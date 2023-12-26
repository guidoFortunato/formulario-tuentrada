
import Image from "next/image";
import Link from "next/link";
// import { useEffect } from "react";

export default function NavBar({ data }) {
  
  return (
    <nav className="bg-gradient-to-b from-maroon-dark to-blue-dark md:from-blue-dark md:to-maroon-dark px-[0.8rem] lg:px-[7.5rem] py-1">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/">
          <Image
            src={data.logo.src}
            alt={data.logo.alt}
            width={197}
            height={89}
            priority
            style={{ width: "auto", height: "auto" }}
          />
        </Link>
        {/* <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
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
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul>
            {data.pages.map((item) => {
              if (item.where === "navbar") {
                return (
                  <li key={item.id}>
                    <Link
                      href={item.path}
                      className="text-[1rem] text-white hover:bg-transparent border-b-0 hover:text-slate-400 md:hover:text-slate-400"
                    >
                      {item.title}
                    </Link>
                  </li>
                );
              }
            })}
          </ul>
        </div> */}
      </div>
    </nav>
  );
}
