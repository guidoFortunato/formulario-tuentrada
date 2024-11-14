import Image from "next/image";
import Link from "next/link";

export const ArticleImages = ({ itemColumn, index, item }) => {
  if (item.width === "33%-67%") {
    // console.log({ index });
    // console.log({ item });
  }
  const newSrc = itemColumn.image?.src.replace("/images/", "https://api.tuentrada.com/storage/" )


  return (
    <div
      className={`
        ${item.width === "25%-75%" ? (index === 0 ? "" : "col-span-2") : ""}
        ${item.width === "75%-25%" ? (index === 0 ? "col-span-2" : "") : ""}
        ${item.width === "50%-25%-25%" ? (index === 0 ? "col-span-2" : "") : ""}
        ${item.width === "25%-25%-50%" ? (index === 2 ? "col-span-2" : "") : ""}
        ${item.width === "67%-33%" ? (index === 0 ? "col-span-3" : "col-span-2") : ""}
        ${item.width === "33%-67%" ? (index === 0 ? "col-span-2" : "col-span-3") : ""}
       flex justify-evenly mb-3`}
    >
      {itemColumn.link ? (
        <Link href={itemColumn.link} target={itemColumn.target}>
          <Image
            key={newSrc}
            src={newSrc}
            alt={itemColumn.alt}
            width={1100}
          height={600}
            className="rounded-lg w-auto h-auto"
          
          />
        </Link>
      ) : (
        <Image
          key={newSrc}
          src={newSrc}
          alt={itemColumn.alt}
          width={1100}
          height={600}
          className="rounded-lg  w-auto h-auto"
        
        />
      )}
    </div>
  );
};
