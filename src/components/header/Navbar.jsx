import Image from "next/image";
import Link from "next/link";
import { ToggleButtonElements } from "./ToggleButtonElements";

export default function NavBar({ data }) {
  // const [open, setOpen] = useState(false);
  const newSrc = data.logo?.src.replace(
    "/images/",
    "https://api.tuentrada.com/storage/"
  );
  // console.log({data})
  return (
    <nav className="bg-gradient-to-b from-maroon-dark to-blue-dark md:from-blue-dark md:to-maroon-dark px-[0.8rem] lg:px-[7.5rem] py-1">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/">
          <Image
            src={newSrc}
            alt={data.logo.alt}
            width={197}
            height={89}
            priority
            style={{ width: "auto", height: "auto" }}
          />
        </Link>

        <ToggleButtonElements data={data} />
      </div>
    </nav>
  );
}
