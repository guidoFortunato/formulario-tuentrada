import dompurify from "isomorphic-dompurify";

export const RichText = ({ itemColumn, item, index, colSpan }) => {
  const sanitizer = dompurify.sanitize;
  // console.log({index})

  const title = itemColumn.titleOrLabel;
  const description = itemColumn.description;
  // console.log({index})

  return (
    <div
    className={`
    ${item.width === "25%-75%" ? (index === 0 ? "" : "col-span-2") : ""} 
    ${item.width === "75%-25%" ? (index === 0 ? "col-span-2" : "") : ""}
    ${item.width === "50%-25%-25%" ? (index === 0 ? "col-span-2" : "") : ""}
    ${item.width === "25%-25%-50%" ? (index === 2 ? "col-span-2" : "") : ""}
    ${item.width === "67%-33%" ? (index === 0 ? "col-span-3" : "col-span-2") : ""}
    ${item.width === "33%-67%" ? (index === 0 ? "col-span-2" : "col-span-3") : ""}
      
    `}
    >
      <h3 className="text-blue-dark font-semibold mb-2">{title}</h3>
      <div className="text-base text-gray-700"
        dangerouslySetInnerHTML={{
          __html: sanitizer(description),
        }}
      ></div>
    </div>
  );
};
