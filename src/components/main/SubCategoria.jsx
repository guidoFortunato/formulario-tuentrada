import AccordionSubCat from "./AccordionSubCat";
import dompurify from "isomorphic-dompurify";

const SubCategoria = ({ category, params }) => {
  const subCategories = category?.subCategories;
  const sanitizer = dompurify.sanitize;
  // console.dir({ category }, { depth: null });

  return (
    <div className="container mx-auto bg-main-image bg-no-repeat bg-left-50 pb-10 px-10 md:px-20 flex-1">
      <div className="mb-5">
        <h2 className="text-[1.6rem] text-blue-dark font-bold">
          {category?.name}
        </h2>
        <div
        className="text-base text-gray-500 italic"
        dangerouslySetInnerHTML={{
          __html: sanitizer(category?.reference),
        }}
      ></div>
        {/* <span className="text-sm text-gray-500 italic">
          {category?.reference}
        </span> */}
      </div>
      {subCategories?.length > 0 &&
        subCategories.map((item) => (
          <AccordionSubCat
            params={params}
            slug={item.slug}
            key={item.id}
            name={item.name}
            articles={item.articles}
          />
        ))}
    </div>
  );
};

export default SubCategoria;
