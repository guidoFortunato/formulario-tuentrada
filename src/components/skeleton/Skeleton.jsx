import React from "react";

export const Skeleton = ({ width }) => {
  return (
    <div
      role="status"
      className="p-4 animate-pulse md:p-6 dark:border-gray-700 flex flex-col justify-center items-center  "
    >
      <div className="flex items-center justify-center">
        <img
          src="https://tuentrada.com/newsletter/logo-negro.png"
          alt="Tuentrada Logo"
          className="w-52"
        />
      </div>

      <div className="text-center mt-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-300">
          Bienvenidos al centro de ayuda
        </h2>

        <p className="text-lg text-gray-700 dark:text-gray-300">
          Estamos cargando la información que necesitas...
        </p>
      </div>
    </div>
  );
};
