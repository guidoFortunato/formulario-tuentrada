import AccordionSubCat from "./AccordionSubCat";

const SubCategoria = ({slug}) => {
  // console.log({params})
  return (
    <div className="container mx-auto bg-main-image bg-no-repeat bg-left-50 pb-10 px-10 md:px-20 flex-1">
      <h2 className="text-2xl text-blue-dark font-semibold mb-10">Devoluciones
      </h2>
      <AccordionSubCat slug={slug} />
      <AccordionSubCat slug={slug} />
      <AccordionSubCat slug={slug} />
      <AccordionSubCat slug={slug} />
    </div>
  );
};

export default SubCategoria;
