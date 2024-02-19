import { useContext } from "react";
import { FormContext } from "@/context/FormContext";

export const Steps = ({ dataForm }) => {
  const { currentStep, stepsEstaticos } = useContext(FormContext);

  const { steps } = dataForm.form;
  const newSteps = [...stepsEstaticos, ...steps];
  const lengthSteps = newSteps.length;
  // console.log({ currentStep, lengthSteps, dataForm });

  // console.log({ newSteps });

  return (
    <ol className="flex items-center w-[80%] mx-auto">
      {newSteps.map((item, index) => (
        <li
          key={index}
          className={`${
            index === lengthSteps - 1
              ? ""
              : currentStep > index
              ? "flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-blue-200 after:border-4 after:inline-block"
              : "flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-4 after:inline-block"
          }  
            
             `}
        >
          <div
            className={`flex items-center justify-center w-10 h-10 ${
              currentStep >= index ? "bg-blue-200" : "bg-gray-200"
            } rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0`}
          >
            <svg
              className="w-4 h-4 text-blue-dark lg:w-6 lg:h-6 dark:text-blue-300"
              aria-hidden="true"
              xmlns={item.svg.xmlns}
              fill="currentColor"
              viewBox={item.svg.viewBox}
            >
              <path d={item.svg.path} />
            </svg>
          </div>
        </li>
      ))}
    </ol>
  );
};
