import AccordionSubCat from "./AccordionSubCat";
import dompurify from "isomorphic-dompurify";

const SubCategoria = ({ category, params }) => {
  const subCategories = category?.subCategories;
  const sanitizer = dompurify.sanitize;
  // console.dir({ subCategories }, { depth: null });

  // const subCategoriesFAQ = subCategories.filter( (item) => item.name.toLowerCase().includes("protege") )[0].articles
  // const titleFAQ = Boolean(subCategoriesFAQ.find( item => item.title.toLowerCase().includes("preguntas frecuentes") ))
  // console.log({titleFAQ})

  // function getFAQTitle(items = Array.from(document.querySelectorAll("#accordion-flush")), category = "protege", key = "preguntas frecuentes") {
  //   var protegeCategory = items.filter(function(item) {
  //     return item.name.toLowerCase().includes(category);
  //   })[0];
  
  //   if (!protegeCategory) return false;
  
  //   var hasFAQTitle = protegeCategory.articles.find(function(item) {
  //     return item.title.toLowerCase().includes(key);
  //   });

  //   if (!Boolean(hasFAQTitle)) return "";
  
  //   return hasFAQTitle.title;
  // }

  // function getFAQTitle(items) {
  //   if (!items) {
  //     items = Array.from(document.querySelectorAll("#accordion-flush"));
  //   }

  //   var title = items.find(function(item) {
  //     return item.textContent.toLowerCase().includes("costo del servicio");
  //   });
    
  //   if (!title) {
  //     return null;
  //   }

  //   var span = title.querySelector("h2 button span");
  //   if (span) {
  //     return span.textContent;
  //   }
  //   return null;
  // }

  // console.log({subCategories})
  
  // const titleFAQ = getFAQTitle(subCategories);
  // console.log({titleFAQ})

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
