import Link from "next/link";
import dompurify from "isomorphic-dompurify";
// import { BsFillPersonCheckFill } from "react-icons/bs";

const CardCategoria = ({ color, title, slug, description, icon }) => {
  const sanitizer = dompurify.sanitize;

  const colorVariantsBg = {
    azul: "bg-gradient-to-b from-card-blue-light to-card-blue-dark",
    violeta: "bg-gradient-to-b from-card-pink-light to-card-pink-dark",
  };

  return (
    <div
      className={`w-full min-h-[250px] flex items-center flex-col justify-center p-6 text-white border border-gray-200 rounded-lg shadow text-center ${colorVariantsBg[color]}`}
    >
      <div className="flex justify-center">
        {/* <BsFillPersonCheckFill /> */}
        <svg
          xmlns={icon.xmlns}
          x="0px"
          y="0px"
          width={icon.width}
          height={icon.height}
          fill={icon.fill}
          viewBox={icon.viewBox}
        >
          <path d={icon.path}></path>
        </svg>
      </div>
      <h5 className="mb-1 text-[1.6rem] font-bold tracking-tight">{title}</h5>
      <div
        className="mb-5  text-base"
        dangerouslySetInnerHTML={{
          __html: sanitizer(description),
        }}
      ></div>
      <Link
        href={slug}
        className={`text-white border-2 border-white hover:bg-white hover:text-black transition duration-150 ease-out hover:ease-in rounded-lg text-base px-10 py-2.5 text-center mr-2 font-semibold`}
      >
        Saber más
      </Link>
    </div>
  );
};
export default CardCategoria;
