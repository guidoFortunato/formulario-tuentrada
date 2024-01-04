import Image from "next/image";
import Accordion from "./Accordion";
import SocialMedia from "./SocialMedia";
import Link from "next/link";

const Footer = ({ data }) => {
  // console.log({data})
  const { pages } = data;
  return (
    <footer className="bg-gradient-image shadow relative bottom-0 w-full ">
      <div className="w-full max-w-screen-xl mx-auto pt-4 ">
        <div className="flex items-center flex-col">
          <a
            href="https://tuentrada.com/"
            className="flex items-center mb-4 sm:mb-0"
          >
            <Image
              src={data.logoFooter.src}              
              alt={data.logoFooter.src}
              width={138}
              height={38}
              priority
              style={{ width: "auto", height: "auto" }}
            />
          </a>
          <span className="mb-4 text-slate-400 ">
           Todos los derechos reservados
          </span>
          <ul className="flex flex-wrap items-center justify-center mb-6 text-base font-semibold text-gray-200 sm:mb-0 dark:text-gray-400">
            {pages.map((item) => {
              if (item.where === "footer-top") {
                return (
                  <li key={item.id}>
                    <Link href={item.path} className="hover:underline ">
                      {item.title}
                    </Link>
                    <span className="mx-1"> • </span>
                  </li>
                );
              }
            })}
          </ul>
        </div>
        <SocialMedia data={data} />
        <Accordion data={data} />
      </div>
    </footer>
  );
};
export default Footer;
