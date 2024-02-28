import { useContext } from "react";
import { Controller } from "react-hook-form";
import Select from "react-select";
import { FormContext } from "@/context/FormContext";

export const TypeFormSelect = ({ item }) => {
  const { register, errors, watch, control } = useContext(FormContext);
  const name = item.name;
  // const name = item.name.toLowerCase().split(" ").join("_");


  const options = item.options.map((option) => ({
    label: option,
    value: option,
  }));

  return (
    <div>
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {item.name}{" "}
        {item.required === 1 && <span className="text-red-500 ml-1">*</span>}
      </label>
      {/* <select
        {...register(name)}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-300 focus:border-blue-dark w-full block p-2.5 mt-2"
      >
        {item.options.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </select> */}

      <Controller
        name={name}
        control={control}
        defaultValue=""
        // rules={{ required: item.required === 1 && "Este campo es obligatorio" }}
          rules={{
            required: {
               value: item.required === 1 ? true : false,
               message: "Este campo es obligatorio",
            },
         }}
        render={({ field }) => {
          // console.log({ field });
          return (
            <Select
              options={options}
              isSearchable={false}
              placeholder="Seleccione una opción..."
              value={options.find((c) => c.value === field.value)}
              onChange={val => field.onChange(val.value)}
              styles={{
                control: (styles, state) => {
                  return {
                    ...styles,
                    borderRadius: "0.5rem",
                    minHeight: "42px",
                    marginBottom: "10px",
                    backgroundColor: "#f7f7f7",

                    "&:hover": {
                      borderColor: state.isFocused
                        ? "#1955A5"
                        : errors[name]
                        ? "#ff4040"
                        : "#D1D5DB",
                      borderWidth: state.isFocused ? "1px" : "1px",
                    },
                    borderColor: state.menuIsOpen
                      ? "#1955A5"
                      : errors[name]
                      ? "#ff4040"
                      : "#D1D5DB",
                  };
                },
                option: (styles, state) => {
                  // console.log({styles, state});
                  return {
                    ...styles,
                    cursor: "pointer",
                    background: state.isSelected ? "#1955A5" : "transparent",
                    color: state.isSelected ? "#fff" : "#000",
                    "&:hover": {
                      background: state.isSelected ? "#1955A5" : "#B2D4FF",
                      color: state.isSelected ? "#fff" : "#000",
                    },
                  };
                },

                // placeholder: (styles) => console.log(styles)
              }}
            />
          );
        }}
      />

      {watch(name) ? (
        watch(name).includes("otro") || watch(name).includes("otra") ? (
          <>
            <input
              type="text"
              name="otra"
              id="otra"
              className={`bg-gray-50 border ${
                errors[name]
                  ? "border-red-500 focus:ring-red-300 focus:border-red-500"
                  : "border-gray-300 focus:ring-blue-300 focus:border-blue-dark"
              } text-gray-900 text-sm rounded-lg block w-full p-2.5 mt-2`}
              placeholder={item.helperText}
              {...register("otra", {
                required: {
                  value: item.required === 1 ? true : false,
                  message: "Este campo es obligatorio",
                },
              })}
            />
            {errors["otra"] && (
              <span className="text-red-600 text-sm block mt-1">
                {errors["otra"].message}
              </span>
            )}
          </>
        ) : null
      ) : null}
      {item.helperText && !errors[name] && (
        <span className="text-gray-500 text-xs block mt-1">
          {item.helperText}
        </span>
      )}
      {errors[name] && (
        <span className="text-red-600 text-xs block mt-1">
          {errors[name].message}
        </span>
      )}
    </div>
  );
};
