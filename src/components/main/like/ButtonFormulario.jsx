"use client"
import Link from "next/link";

export const ButtonFormulario = ({ params }) => {
  return (
    <Link href={`${params.subcategoria}/formulario`}>
      <button
        type="button"
        className={`w-auto mr-2 text-white bg-gradient-to-r from-blue-light to-blue-dark hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:blue-dark  font-medium rounded-md text-sm px-5 py-2.5 text-center mb-2`}
      >
        Completar formulario
      </button>
    </Link>
  );
};
